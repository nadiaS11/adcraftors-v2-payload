namespace :yarn do
    desc "Install the frontend project dependencies via yarn"
    task :install do
        on roles fetch(:yarn_roles) do
            within release_path do
                with fetch(:yarn_env_variables, {}) do
                    execute :yarn, fetch(:yarn_method), fetch(:yarn_flags)
                end
            end
        end
    end
    desc "Build the frontend project dependencies"
    task :build do
        on roles fetch(:build_roles) do
            within release_path do
                execute :yarn, fetch(:build_method), fetch(:build_flags)
            end
        end
    end
end

namespace :load do
    task :defaults do
      set :yarn_roles, :all
      set :yarn_method, 'install'
      set :yarn_flags, %w(--silent) # FIXME: Don't know why! But removing --production (works)
      set :build_roles, :all
      set :build_flags, nil
      set :build_method, 'build'
    end
end