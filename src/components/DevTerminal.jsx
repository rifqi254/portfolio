import { useState, useRef, useEffect } from 'react'
import { playBubblePop, playChime } from '../hooks/useAudioFX'
import './DevTerminal.css'

const BANNER = `
   ____  _ _____ _____     ____  ____ 
  |  _ \\(_)  ___/ _ \\ \\   / /  |/ ___|
  | |_) | | |_ | | | \\ \\ / /| | \\___ \\
  |  _ <| |  _|| |_| |\\ V / | |  ___) |
  |_| \\_\\_|_|   \\__\\_\\ \\_/  |_|_|____/ 
  ──────────────────────────────────────
  RifqiOS DevConsole v2.4 (x86_64-web)
  Type 'help' to display available commands.
`

const COMMAND_LIST = [
  { cmd: 'help', desc: 'Tampilkan daftar seluruh perintah' },
  { cmd: 'about', desc: 'Profil singkat & latar belakang akademik' },
  { cmd: 'skills', desc: 'Daftar teknologi & tech stack inti' },
  { cmd: 'projects', desc: 'Daftar 7 proyek portofolio & live link' },
  { cmd: 'certs', desc: 'Daftar 7 sertifikat kompetensi resmi' },
  { cmd: 'awards', desc: 'Penghargaan & apresiasi kepemimpinan' },
  { cmd: 'contact', desc: 'Saluran sosial media & email resmi' },
  { cmd: 'cv', desc: 'Buka dokumen resmi Curriculum Vitae (CV)' },
  { cmd: 'theme <name>', desc: 'Ubah tema 3D: aero, silver, emerald, sunset' },
  { cmd: 'date', desc: 'Waktu dan tanggal sistem saat ini' },
  { cmd: 'whoami', desc: 'Identitas user saat ini' },
  { cmd: 'clear', desc: 'Bersihkan layar konsol terminal' },
  { cmd: 'exit', desc: 'Tutup jendela terminal' },
]

export default function DevTerminal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [inputVal, setInputVal] = useState('')
  const [history, setHistory] = useState([
    { type: 'banner', text: BANNER },
    { type: 'system', text: "Ready. Type 'help' to start exploring." },
  ])
  const [cmdHistory, setCmdHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  const terminalEndRef = useRef(null)
  const inputRef = useRef(null)

  // Scroll to bottom on output change
  useEffect(() => {
    if (isOpen && !isMinimized) {
      terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [history, isOpen, isMinimized])

  // Focus input when terminal opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus()
    }
  }, [isOpen, isMinimized])

  // Global shortcut (backtick ` or ~)
  useEffect(() => {
    const handleGlobalKey = (e) => {
      if (e.key === '`' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
        e.preventDefault()
        setIsOpen((prev) => !prev)
        setIsMinimized(false)
        playChime()
      }
    }
    window.addEventListener('keydown', handleGlobalKey)
    return () => window.removeEventListener('keydown', handleGlobalKey)
  }, [])

  const handleCommand = (rawCmd) => {
    const trimmed = rawCmd.trim()
    if (!trimmed) return

    setCmdHistory((prev) => [...prev, trimmed])
    setHistoryIndex(-1)

    const parts = trimmed.split(' ')
    const cmd = parts[0].toLowerCase()
    const arg = parts.slice(1).join(' ').toLowerCase()

    const newEntries = [{ type: 'input', text: `rifqi@dev-terminal:~$ ${trimmed}` }]

    switch (cmd) {
      case 'help':
        newEntries.push({
          type: 'output',
          text: COMMAND_LIST.map((c) => `  ${c.cmd.padEnd(16)} : ${c.desc}`).join('\n'),
        })
        break

      case 'about':
        newEntries.push({
          type: 'output',
          text:
            'Nama       : Muhammad Rifqi Maulana\n' +
            'Pendidikan : Teknik Informatika (Semester 7) — UIN SMH Banten\n' +
            'Role       : Full-Stack Web Developer & Creative Tech Enthusiast\n' +
            'Lokasi     : Banten & Tangerang Selatan, Indonesia\n' +
            'Status     : Available for Opportunities & Projects',
        })
        break

      case 'skills':
        newEntries.push({
          type: 'output',
          text:
            '⚡ Frontend  : HTML5, CSS3, JavaScript ES6+, React 19, Tailwind CSS, Three.js\n' +
            '🐘 Backend   : PHP, Laravel, Node.js, RESTful API Architecture\n' +
            '🐬 Database  : MySQL, Relational Schema, ACID Transactions\n' +
            '🚀 Tools     : Git, GitHub, Postman, Vite, Figma, MS Office',
        })
        break

      case 'projects':
        newEntries.push({
          type: 'output',
          text:
            '1. SMLTI Tangsel    : Sistem Manajemen Logistik TI Diskominfo Tangsel\n' +
            '2. EnglAI           : AI-Powered Smart Learning Platform (https://englai.my.id)\n' +
            '3. EcoCampus Lab    : Citizen Science & Biodiversity Monitoring (UIN Banten)\n' +
            '4. Seleksi HMPS     : Portal Registrasi & Computer Based Test (CBT)\n' +
            '5. SUMMITIX 3D      : 3D Holographic Event Ticketing Experience\n' +
            '6. RAMENATSU        : Japanese Culinary Brand & Digital Menu Platform\n' +
            '7. Citra Garden     : Residential Property & Infrastructure Showcase\n\n' +
            "💡 Tip: Ketik 'open <nama>' atau scroll ke bagian Archive untuk melihat langsung.",
        })
        break

      case 'certs':
        newEntries.push({
          type: 'output',
          text:
            '1. Magang Diskominfo Tangsel (Predikat: SANGAT BAIK)\n' +
            '2. Dicoding — Belajar Dasar Pemrograman JavaScript (2025)\n' +
            '3. Dicoding — Belajar Membuat Aplikasi Back-End Pemula (2025)\n' +
            '4. Dicoding — Belajar Dasar AI & AWS Cloud (2025)\n' +
            '5. Coursera — Getting Started with Microsoft Excel (2026)\n' +
            '6. HMPS — Leadership & Management Training TI (2024)\n' +
            '7. Sertifikat Kepengurusan Ketua Divisi Kominfo HMPS (2026)',
        })
        break

      case 'awards':
        newEntries.push({
          type: 'output',
          text:
            '🏆 1. Penghargaan Predikat SANGAT BAIK — Magang Diskominfo Tangsel (2026)\n' +
            '🎖️ 2. AWS & Dicoding Cloud Excellence Award (2025)\n' +
            '👑 3. HMPS Outstanding Leadership Award — Ketua Divisi Kominfo (2026)',
        })
        break

      case 'contact':
        newEntries.push({
          type: 'output',
          text:
            '📧 Email     : maulanarifqi741@gmail.com\n' +
            '🐙 GitHub    : https://github.com/Rifqi254\n' +
            '💼 LinkedIn  : https://www.linkedin.com/in/maulana-rifqi-1550962b7/\n' +
            '📸 Instagram : https://www.instagram.com/alla.an_/',
        })
        break

      case 'cv':
        newEntries.push({
          type: 'system',
          text: '🚀 Membuka dokumen Curriculum Vitae (CV) interaktif...',
        })
        window.dispatchEvent(new CustomEvent('open-resume'))
        break

      case 'theme':
        if (['aero', 'silver', 'emerald', 'sunset'].includes(arg)) {
          window.dispatchEvent(new CustomEvent('change-chrome-preset', { detail: { preset: arg } }))
          newEntries.push({
            type: 'system',
            text: `✨ Berhasil mengganti tema 3D ke preset: [${arg.toUpperCase()}]`,
          })
        } else {
          newEntries.push({
            type: 'error',
            text: "Argumen tidak valid. Pilihan tema: 'aero', 'silver', 'emerald', 'sunset'. Contoh: 'theme sunset'",
          })
        }
        break

      case 'date':
        newEntries.push({
          type: 'output',
          text: new Date().toString(),
        })
        break

      case 'whoami':
        newEntries.push({
          type: 'output',
          text: 'guest@portfolio (Welcome! Feel free to explore Rifqi Maulana\'s portfolio commands)',
        })
        break

      case 'sudo':
        newEntries.push({
          type: 'error',
          text: 'Nice try! Guest users cannot acquire superuser privileges 😄',
        })
        break

      case 'clear':
        setHistory([])
        setInputVal('')
        return

      case 'exit':
        setIsOpen(false)
        setInputVal('')
        return

      default:
        newEntries.push({
          type: 'error',
          text: `Command not found: '${trimmed}'. Type 'help' to see available commands.`,
        })
        break
    }

    setHistory((prev) => [...prev, ...newEntries])
    setInputVal('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      playBubblePop()
      handleCommand(inputVal)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (cmdHistory.length > 0) {
        const nextIndex = historyIndex + 1 < cmdHistory.length ? historyIndex + 1 : historyIndex
        setHistoryIndex(nextIndex)
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIndex] || '')
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1
        setHistoryIndex(nextIndex)
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIndex] || '')
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInputVal('')
      }
    }
  }

  return (
    <>
      {/* Floating CLI Toggle Button at bottom right */}
      <button
        className="terminal-float-btn"
        onClick={() => {
          setIsOpen((prev) => !prev)
          setIsMinimized(false)
          playChime()
        }}
        title="Buka Developer CLI Console (Shortcut: `)"
        aria-label="Buka Developer Terminal"
      >
        <span className="terminal-float-btn__dot" />
        <span className="terminal-float-btn__icon">&gt;_</span>
        <span className="terminal-float-btn__text">Terminal</span>
      </button>

      {/* Terminal Window Overlay */}
      {isOpen && (
        <div className={`dev-terminal ${isMinimized ? 'is-minimized' : ''}`} role="dialog" aria-label="Developer Console">
          {/* Top Window Bar */}
          <div className="terminal-bar">
            <div className="terminal-bar__left">
              <span className="terminal-dot terminal-dot--close" onClick={() => setIsOpen(false)} title="Close (exit)" />
              <span className="terminal-dot terminal-dot--min" onClick={() => setIsMinimized((prev) => !prev)} title="Minimize" />
              <span className="terminal-dot terminal-dot--max" onClick={() => setIsMinimized(false)} title="Expand" />
              <span className="terminal-bar__title">rifqi@dev-terminal: ~ (RifqiOS v2.4)</span>
            </div>
            <div className="terminal-bar__right">
              <span className="terminal-bar__shortcut">Shortcut: `</span>
            </div>
          </div>

          {/* Terminal Body */}
          {!isMinimized && (
            <div className="terminal-screen" onClick={() => inputRef.current?.focus()}>
              {/* Output history */}
              {history.map((item, idx) => (
                <div key={idx} className={`terminal-line terminal-line--${item.type}`}>
                  <pre>{item.text}</pre>
                </div>
              ))}

              {/* Prompt Input Line */}
              <div className="terminal-input-row">
                <span className="terminal-prompt">rifqi@dev-terminal:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="terminal-input"
                  autoFocus
                  spellCheck="false"
                  autoComplete="off"
                />
              </div>

              <div ref={terminalEndRef} />
            </div>
          )}
        </div>
      )}
    </>
  )
}
