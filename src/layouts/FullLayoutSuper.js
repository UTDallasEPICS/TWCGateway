import { Outlet } from "react-router-dom";
import SuperSidebar from "./SuperSidebar";

import { Container } from "reactstrap";

const FullLayoutSuper = () => {
  return (
    <main>
      <div className="pageWrapper d-lg-flex" style={{backgroundColor: "#a7a9ac"}}>
        {/********Sidebar**********/}
        <aside className="sidebarArea shadow" id="sidebarArea">
          <SuperSidebar />
        </aside>
        {/********Content Area**********/}

        <div className="contentArea">
          {/********header**********/}
          {/*<Header />*/}
          {/********Middle Content**********/}
          <Container className="p-4 wrapper" fluid>
            <Outlet />
          </Container>
        </div>
      </div>
    </main>
  );
};

export default FullLayoutSuper;