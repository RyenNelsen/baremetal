# baremetal
Lightweight CSS framework.

### Browser Support
For the traditional float grid system, it should work in every browser IE>6. Transitions obviously will not function.

For the flexbox grid system, it should work in every browser IE>8. This should be the preferred choice.

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

The files contained in `build/production` have different grid systems. The flex grid system should be used over the classic float system whenever possible.
Flexbox is cleaner and makes designing websites much easier, and has had support since IE>9.
