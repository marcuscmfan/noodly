import { Route, Routes } from "react-router-dom"
import NotFound from './pages/404';
import Restaurant from './components/Restaurant'
import items from './ramen-restaurants.json';
import Search  from './pages/Search';
import Home from './pages/Home';
import About from './pages/About'
import Explore from './pages/Explore';

function AppRoutes() {
    return(
        <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/explore' element={<Explore />} />
        <Route path='/search' element={<Search />} />
        {items.map(item => (
            <Route
                key={item.id}
                path={item.to}
                element={<Restaurant id={item.id} />}
            />
            ))}
        <Route path='*' element={<NotFound />} />
    </Routes>
    )
}

export default AppRoutes;