// host - ./src/types/remote.d.ts
declare module "remote_app/Button" {
  const Button: React.FC<{
    text: string;
    onClick?: () => void;
  }>;
  export default Button;
}

declare module "remote_app/Header" {
  const Header: React.FC;
  export default Header;
}

declare module "remote_app/App" {
  const App: React.FC;
  export default App;
}
declare module "remote_app_datarouter/App" {
  const App: React.FC;
  export default App;
}