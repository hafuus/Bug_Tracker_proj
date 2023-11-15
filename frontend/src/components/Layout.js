// Layout.js
import AddProject from './Project/AddProject';
import Projects from './Project/Projects';
import Sidebar from './Sidebar';
import Charts from './Charts';
import StatusChart from './StatusChart';

function Layout() {
  return (
    <div className=" ">
    {/* //   <Sidebar/> */}
      <div className=" flex ">
      <Projects/>
    </div>
    <div className='flex'>
    <Charts/>
    <StatusChart/>
    </div>
    

   </div>
  );
}

export default Layout;
