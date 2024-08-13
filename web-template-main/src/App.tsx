import './App.style.scss'
import { Main } from './components/Main/Main'

export function App() {
    const HeaderItems = [
        { label: 'Просмотр', link: '1' },
        { label: 'Управление', link: '2' }
    ]
    return (
        <Main menuList={HeaderItems} headerList={HeaderItems} />
    )
}
