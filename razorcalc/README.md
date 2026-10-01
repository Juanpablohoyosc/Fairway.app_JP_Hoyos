# Razorcalc

A graphing and finance calculator built for student-athletes. It runs entirely in the browser as a single `index.html` with no build step.

**Live site:** https://juanpablohoyosc.github.io/razorcalc/

## Features

- **Finance:** TVM Solver, `npv(`, `irr(`, `bal(`, `ΣPrn(`, `ΣInt(`, `►Nom(`, `►Eff(`, `dbd(`
- **Graphing:** Y= (four functions), WINDOW, ZOOM, TRACE, TABLE, and CALC (value, zero, minimum, maximum, intersect)
- **Statistics:** list editor (L₁–L₆), 1-Var and 2-Var Stats, LinReg, QuadReg, ExpReg, scatter plots
- **Distributions:** normal, binomial, Poisson and geometric pdf/cdf, plus `invNorm(`
- **Matrices:** `[A]`–`[C]` with an editor, `det(`, transpose, inverse, `identity(`
- **Programs and drawing:** short programs with `Disp`; ClrDraw, Line, Horizontal, Vertical, Circle
- **Other:** MODE (Float/Fix, Sci/Eng, Radian/Degree), angle conversions, RCL, catalog, and keyboard input
- **Calculator-only view:** turns on automatically on phones; open it anywhere with `#calc`, e.g. `https://juanpablohoyosc.github.io/razorcalc/#calc`

Memory is saved in the browser's local storage.

## Deploying

Pushing to `main` runs `.github/workflows/pages.yml`, which publishes `index.html` to GitHub Pages. In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**.

---

Razorcalc is an independent student project. It is not affiliated with, sponsored by, or endorsed by the University of Arkansas or its athletics programs.
