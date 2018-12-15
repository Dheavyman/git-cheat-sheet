const cheats = [
  {
    "category": "Install GIT",
    "description": "Install git on macOS with Homebrew",
    "command": "brew install git",
    "keywords": ["install", "macos", "homebrew"]
  },
  {
    "category": "Install GIT",
    "description": "Install git on Debian-based linux",
    "command": "sudo apt-get install git",
    "keywords": ["install", "apt-get", "debian" , "linux"]
  },
  {
    "category": "Install GIT",
    "description": "Install git on Windows with Chocolatey",
    "command": "choco install git",
    "keywords": ["install", "windows", "choco"]
  },
  {
    "category": "Configuration",
    "command": "git config --global user.name [name]",
    "description": "Sets the name you want attached to your commit transaction",
    "keywords": ["configuration", "name", "email", "user"]
  },
  {
    "category": "Configuration",
    "command": "git config --global user.email [email address]",
    "description": "Sets the email you want atached to your commit transactions",
    "keywords": ["configuration", "name", "email", "user"]
  },
  {
    "category": "Configuration",
    "command": "git config --global color.ui auto",
    "description": "Enables helpful colorization of command line output",
    "keywords": ["configuration", "color", "ui", "customization"]
  },
  {
    "category": "Create Repositories",
    "command": "git init [project-name]",
    "description": "Creates a new local repository with the specified name",
    "keywords": ["new", "project", "create"]
  },
  {
    "category": "Create Repositories",
    "command": "git clone [url]",
    "description": "Downloads a project and its entire version history",
    "keywords": ["download", "remote", "clone", "checkout"]
  },
  {
    "category": "Make Changes",
    "command": "git status",
    "description": "Lists all new or modified files to be commited",
    "keywords": ["change", "modifications", "commit"]
  }
];

export default cheats;
