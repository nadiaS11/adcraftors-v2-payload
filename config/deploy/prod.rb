# server-based syntax
# ======================
server "31.97.56.77", user: "root", roles: %w{app db web}, port: 2235

# Repo ULR
set :repo_url, "git@github.com:nadiaS11/adcraftors-v2-payload.git"
# Default branch is :main (for production it should be always main)
set :branch, 'main'

# Default deploy_to directory is /var/www/my_app_name
set :deploy_to, "var/www/nadiasultana"

set :yarn_flags, %w(--force --silent) # FIXME: Removed --production flag
set :build_method, 'build-prod' 
