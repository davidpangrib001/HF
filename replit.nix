{ pkgs }: {
  deps = [
    pkgs.sudo
    pkgs.neofetch
    pkgs.zip
    pkgs.nodejs-18_x
    pkgs.unzip
    pkgs.bashInteractive
    pkgs.nodePackages.bash-language-server
    pkgs.man
  ];
}