class SmartNavigation {
    static handle(navigate, val, path, location, params) {
        let str = "";
        Object.entries(params).map(([key, value]) => str += `${key}=${value}&`);

        if (location.pathname === `/${path}`) {
            navigate(`/${path}?${str}`, { replace: true });
        } else {
            navigate(`/${path}?${str}`);
        }
    }
}

export default SmartNavigation;