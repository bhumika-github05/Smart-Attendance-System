export default function Navbar() {
  return (
    <div className="topbar">
      <div className="top-left">
        <img src="https://upload.wikimedia.org/wikipedia/en/4/45/Lovely_Professional_University_logo.png" alt="logo"/>
        <span>Lovely Professional University</span>
      </div>

      <div className="top-menu">
        <span className="active">Dashboard</span>
        <span>Attendance</span>
        <span>Reports</span>
        <span>Notifications</span>
      </div>

      <div className="top-right">
        <span>Welcome, Gourvit</span>
        <img src="https://i.pravatar.cc/40" alt="profile"/>
      </div>
    </div>
  );
}