import { Button, Nav, NavItem } from "reactstrap";

import { Link, useLocation } from "react-router-dom";

const navigation = [
  {
    title: "Account",
    href: "/admin/Account",
    
  },
  {
    title: "New Employee Form",
    href: "/admin/NewEmployeeForm",
    
  },
  {
    title: "New Supervisor Form",
    href: "/admin/NewSupervisorForm",
    
  },
  {
    title: "Current Onboarding",
    href: "/admin/CurrentOnboarding",
    
  },
  {
    title: "Default Tasks",
    href: "/admin/DefaultTasks",
    
  },

  
];

const Sidebar = () => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  return (
    <div className="p-3">
      <div className="d-flex align-items-center">
        <h4>Admin</h4>
        <Button
          close
          size="sm"
          className="ms-auto d-lg-none"
          onClick={() => showMobilemenu()}
        ></Button>
      </div>
      <div className="pt-4 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "text-primary nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
