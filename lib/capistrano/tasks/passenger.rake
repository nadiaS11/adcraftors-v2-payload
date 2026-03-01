namespace :passenger do
    desc 'Restart frontend Passenger application'
    task :restart do
        on roles :all do
            within release_path do
                execute :mkdir, '-p', release_path.join('tmp')
                execute :touch, release_path.join('tmp/restart.txt')
            end
        end
    end
end