import './App.style.scss'
import { Main } from './components/Main/Main'

export function App() {
    const params = Object.entries({
        cc_load_policy: 0,
        controls: 2,
        fs: 0,
        rel: 0,
        showinfo: 0
    }).map(([key, value]) => `${key}=${value}`).join('&')

    const HeaderItems = [
        { label: 'Просмотр', link: '1' },
        { label: 'Управление', link: '2' }
    ]

    return (
        <div>
            <Main menuList={HeaderItems} headerList={HeaderItems} />
        </div>

    )
}
