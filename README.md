# baremetal
Lightweight CSS framework.

### Building Instructions
Pull the repository from github:
```bash
git clone https://github.com/RyenNelsen/baremetal.git
```

Install dependencies:
```bash
cd baremetal
npm install
npm install -g gulp # optional if you want gulp globally
```

Run gulp:
```bash
gulp # globally installed gulp

#--- OR ----

npm run build # locally installed gulp
```

The compiled files are located in `build`.
For development purposes, the css file in `build/development` contains sourcemaps, and should not be used in production as it adds to the file size.