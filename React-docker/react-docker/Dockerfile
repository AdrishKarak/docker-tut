# ================================
# 1️⃣ Base Image
# ================================
# Use official Node.js 20 image (Debian-based).
# This uses glibc instead of musl → better compatibility with
# Vite, Rollup, esbuild, and other native Node modules.
# Node 20 = LTS, stable for development & production builds.
FROM node:20


# ================================
# 2️⃣ Create Non-Root User (Security Best Practice)
# ================================
# Debian images DO NOT support Alpine's adduser/addgroup flags.
# So we must use:
#   groupadd  → create a system group
#   useradd   → create a system user
#
# -r → create system account (no login shell, low privileges)
# -g → assign user to group
RUN groupadd -r app && useradd -r -g app app


# ================================
# 3️⃣ Set Working Directory
# ================================
# WORKDIR creates /app if it doesn't exist
# and makes it the default directory for all following commands.
WORKDIR /app


# ================================
# 4️⃣ Copy Dependency Files First (Layer Caching Optimization)
# ================================
# Copy only dependency files first.
# Docker caches this layer, so if dependencies don't change,
# future builds skip reinstalling them → much faster.
COPY package*.json ./


# ================================
# 5️⃣ Install Dependencies (Must Run as root)
# ================================
# We install dependencies BEFORE switching to non-root.
# npm needs permission to create node_modules, binaries, etc.
# Installing as non-root can cause:
#   - EACCES permission errors
#   - incomplete installs
#   - missing Vite/Rollup native binaries
RUN npm install


# ================================
# 6️⃣ Copy Application Source Code
# ================================
# Now copy the rest of the project files.
# This happens AFTER dependency install to preserve Docker cache.
COPY . .


# ================================
# 7️⃣ Fix File Ownership
# ================================
# Docker copies files as root by default.
# Since the container will run as user "app",
# we must transfer ownership to avoid permission issues.
RUN chown -R app:app /app


# ================================
# 8️⃣ Switch to Non-Root User
# ================================
# From this point, the app runs with limited privileges.
# This is critical for container security.
USER app


# ================================
# 9️⃣ Expose Application Port
# ================================
# Vite dev server runs on port 5173.
# EXPOSE documents the port; it does NOT publish it automatically.
EXPOSE 5173


# ================================
# 🔟 Default Container Command
# ================================
# Starts Vite development server with hot reload.
CMD ["npm", "run", "dev"]

#command to run the docker file after build: docker run -p 5173:5173 -v "$(pwd):/app" react-docker
#command to create tag-pull : docker tag react-docker adrishkarak/react-docker
#command to push : docker push adrishkarak/react-docker