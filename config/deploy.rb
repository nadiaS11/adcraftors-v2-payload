# config valid for current version and patch releases of Capistrano
lock "~> 3.19.0"

set :application, "nadiasultana"

# Default value for :pty is false
set :pty, true

# Linked backend dirs & files
# Default value for linked_dirs is []
append :linked_dirs, "node_modules", "media", "log"

# Default value for :linked_files is []
append :linked_files, ".env"

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for local_user is ENV['USER']
# set :local_user, -> { `git config user.name`.chomp }

# Default value for keep_releases is 5
# set :keep_releases, 5

# Uncomment the following to require manually verifying the host key before first deploy.
# set :ssh_options, verify_host_key: :secure
set :ssh_options, {
    forward_agent: true,
}

# Custom Next.js build output directories
set :next_build_folder, '.next' # Define the Next.js build output folder (e.g., .next)
set :standalone_folder, '.next/standalone' # Define the standalone subfolder (e.g., .next/standalone)

namespace :deploy do
  desc "Install the project dependencies"
  task :install_dependencies do
    invoke 'yarn:install'
  end

  desc "Build the project dependencies"
  task :build_dependencies do
    invoke 'yarn:build'
  end

  desc "Restart Servers"
  task :restart_servers do
    invoke 'passenger:restart'
  end

  desc "Move standalone contents to release root"
  task :release_standalone do
    on roles(:app) do
      # Delete everything in release_path except the .next directory
      execute :find, "#{release_path}", "-maxdepth 1 -not -path #{release_path} -not -path #{release_path}/#{fetch(:next_build_folder)} -exec rm -rf {} +"
      # Delete everything in release_path/.next except the .next/standalone directory
      execute :find, "#{release_path}/#{fetch(:next_build_folder)}", "-maxdepth 1 -not -path #{release_path}/#{fetch(:next_build_folder)} -not -path #{release_path}/#{fetch(:standalone_folder)} -exec rm -rf {} +"
      # Use rsync to move all contents (including hidden files and folders) from standalone folder to release root
      execute :rsync, "-a --remove-source-files", "#{release_path}/#{fetch(:standalone_folder)}/", "#{release_path}/"
      # Remove the now-empty standalone folder
      execute :rm, '-rf', "#{release_path}/#{fetch(:standalone_folder)}"
    end
  end

  before :updated, :install_dependencies
  after :updated, :build_dependencies
  before :published, :release_standalone
  after :finished, :restart_servers
end
