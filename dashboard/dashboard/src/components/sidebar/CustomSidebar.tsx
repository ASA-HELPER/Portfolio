import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import {
  Dashboard as DashboardIcon,
  WorkOutline as ProjectIcon,
  Build as SkillIcon,
  Apps as UsesIcon,
  Timeline as TimelineIcon,
  MailOutline as MessagesIcon,
  AccountCircle as AccountIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import "./customSidebar-styles.scss";

const Sidebar = ({ active, setActive, onLogout }) => {
  const navItems = [
    { label: "Dashboard", icon: <DashboardIcon />, key: "Dashboard" },
    { label: "Add Project", icon: <ProjectIcon />, key: "Add Project" },
    { label: "Add Skill", icon: <SkillIcon />, key: "Add Skill" },
    { label: "Add Uses", icon: <UsesIcon />, key: "Add Uses" },
    { label: "Add Timeline", icon: <TimelineIcon />, key: "Add Timeline" },
    { label: "Messages", icon: <MessagesIcon />, key: "Messages" },
    { label: "Account", icon: <AccountIcon />, key: "Account" },
  ];

  return (
    <aside className="sidebar">
      <nav className="sidebar__nav">
        {navItems.map((item) => (
          <Tooltip key={item.key} title={item.label} placement="right">
            <Link
              to={item.key}
              className={`sidebar__link ${
                active === item.key ? "sidebar__link--active" : ""
              }`}
              onClick={() => setActive(item.key)}
            >
              {item.icon}
              <span className="sr-only">{item.label}</span>
            </Link>
          </Tooltip>
        ))}
      </nav>
      <Tooltip title="Logout" placement="right">
        <button className="sidebar__logout" onClick={onLogout}>
          <LogoutIcon />
          <span className="sr-only">Logout</span>
        </button>
      </Tooltip>
    </aside>
  );
};

export default Sidebar;
