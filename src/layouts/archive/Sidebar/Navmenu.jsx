import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import useMobileMenu from "@/hooks/useMobileMenu";
import Icon from "@/components/ui/icon";
import Submenu from "./Submenu";

const Navmenu = ({ menus }) => {
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const location = useLocation();
  const locationName = location.pathname.replace("/", "");
  const { mobileMenu, setMobileMenu } = useMobileMenu();

  const toggleSubmenu = (i) => {
    if (activeSubmenu === i) {
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(i);
    }
  };

  useEffect(() => {
    let submenuIndex = null;
    menus.map((item, i) => {
      if (!item.child) return;
      if (item.link === locationName) {
        submenuIndex = null;
      } else {
        const ciIndex = item.child.findIndex((ci) => ci.childlink === locationName);
        if (ciIndex !== -1) {
          submenuIndex = i;
        }
      }
    });
    document.title = `Dashboard KSO - ERP  | ${locationName}`;

    setActiveSubmenu(submenuIndex);
    if (mobileMenu) {
      setMobileMenu(false);
    }
  }, [location]);

  return (
    <>
      <ul>
        {menus.map((item, i) => (
          <li key={i} className={`single-sidebar-menu ${item.child ? "item-has-children" : ""} ${activeSubmenu === i ? "open" : ""} ${locationName === item.link ? "menu-item-active" : ""}`}>
            {/* single menu with no childred*/}
            {!item.child && !item.isHeadr && (
              <NavLink className="menu-link" to={item.link}>
                <span className="menu-icon flex-grow-0">
                  <Icon icon={item.icon} />
                </span>
                <div className="text-box flex-grow">{item.title}</div>
                {item.badge && <span className="menu-badge">{item.badge}</span>}
              </NavLink>
            )}
            {/* only for menulabel */}
            {item.isHeadr && !item.child && <div className="menulabel">{item.title}</div>}
            {/* !!sub menu parent   */}
            {item.child && (
              <div className={`menu-link ${activeSubmenu === i ? "parent_active not-collapsed" : "collapsed"}`} onClick={() => toggleSubmenu(i)}>
                <div className="flex-1 flex items-start">
                  <span className="menu-icon">
                    <Icon icon={item.icon} />
                  </span>
                  <div className="text-box">{item.title}</div>
                </div>
                <div className="flex-0">
                  <div className={`menu-arrow transform transition-all duration-300 ${activeSubmenu === i ? " rotate-90" : ""}`}>
                    <Icon icon="heroicons-outline:chevron-right" />
                  </div>
                </div>
              </div>
            )}
            <Submenu activeSubmenu={activeSubmenu} item={item} i={i} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Navmenu;
