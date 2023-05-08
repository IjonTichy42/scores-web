import Link from 'next/link'

function MainNavigation() {

  return (
      <nav className="fixed top-0 left-0 w-full bg-gray-300 dark:bg-gray-800 p-8 z-10">
        <ul className="flex">
          <li className="mr-8">
            <Link href='/'>Таблица</Link>
          </li>
          <li className="mr-8">
            <Link href='/fixtures'>Матчи</Link>
          </li>
        <li className="mr-8">
            <Link href='/add-results'>Добавить результаты</Link>
        </li>
            <li className="mr-8">
                <Link href='/predictions'>Прогнозы</Link>
            </li>
            <li className="mr-8">
                <Link href='/add-predictions'>Добавить прогнозы</Link>
            </li>
        </ul>
      </nav>
  );
}

export default MainNavigation;
