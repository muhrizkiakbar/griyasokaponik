Tambahkan dukungan dark mode dan light mode.

Aturan theme:
- Gunakan Tailwind darkMode: 'class'
- Toggle theme berada di topbar/header
- Simpan pilihan theme ke localStorage dengan key: theme
- Saat theme dark aktif, tambahkan class dark pada document.documentElement
- Saat theme light aktif, hapus class dark dari document.documentElement
- Default theme mengikuti localStorage, jika belum ada gunakan light mode

Style light mode:
- Background utama: #F5F7F2
- Card: white atau green-50
- Text utama: green-950 / gray-900
- Border: green-100
- Header: bg-white/80 backdrop-blur-xl

Style dark mode:
- Background utama: #071F16
- Sidebar tetap #123D2A
- Card: #123D2A atau #0B2A1E
- Border: white/10
- Text utama: white / green-50
- Text soft: green-100 / green-200
- Header: bg-[#123D2A]/90 backdrop-blur-xl
- Accent tetap lime-400
- Button utama tetap bg-green-700 hover:bg-green-800
- Active menu tetap bg-white text-green-950 agar kontras

Komponen dark mode wajib:
- Semua card harus memiliki dark:bg-[#123D2A] atau dark:bg-[#0B2A1E]
- Semua border harus memiliki dark:border-white/10
- Semua text gray gelap harus punya dark:text-green-50 atau dark:text-green-100
- Semua table header harus punya dark:bg-white/10
- Semua table row hover harus punya dark:hover:bg-white/5
- Semua input/select/textarea harus punya dark:bg-[#0B2A1E], dark:text-white, dark:border-white/10
- Empty state harus punya dark:bg-white/5 dan dark:border-white/10

Jangan membuat dark mode berwarna biru.
Jangan mengubah identitas visual KebunKu.
Dark mode tetap harus bernuansa pertanian premium.
