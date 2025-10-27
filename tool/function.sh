#!/bin/bash

# --- logging functions ---
echo_info() {
  echo "${Cyan}[INFO] $1${Color_Off}"
}

echo_success() {
  echo "${Green}[SUCCESS] $1${Color_Off}"
}

echo_error() {
  echo "${Red}[ERROR] $1${Color_Off}"
}

echo_warn() {
  echo "${Yellow}[WARN] $1${Color_Off}"
}

# --- utility functions ---
confirm() {
  # call with a prompt string or use a default
  local prompt="${1:-Are you sure?}"
  while true; do
    read -p "$(echo_warn "$prompt [y/n]: ")" yn
    case $yn in
    [Yy]*) return 0 ;; # success
    [Nn]*) return 1 ;; # failure
    *) echo_error "Please answer yes or no." ;;
    esac
  done
}