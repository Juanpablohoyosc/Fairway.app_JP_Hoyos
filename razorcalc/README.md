# Razorcalc

A graphing and finance calculator built for student-athletes. It runs entirely in the browser as a single `index.html` with no build step.

**Live site:** https://juanpablohoyosc.github.io/Razorcalc/

## Features

- **Finance:** TVM Solver, `npv(`, `irr(`, `bal(`, `ΣPrn(`, `ΣInt(`, `►Nom(`, `►Eff(`, `dbd(`
- **Graphing:** Y= (four functions), WINDOW, ZOOM, TRACE, TABLE, and CALC (value, zero, minimum, maximum, intersect)
- **Statistics:** list editor (L₁–L₆, list formulas, frequency lists), 1-Var and 2-Var Stats, and all TI-84 regressions (Med-Med, linear, quadratic, cubic, quartic, ln, exponential, power, logistic, sine) with RegEQ storage
- **Tests and intervals:** Z-Test, T-Test, 2-SampZTest, 2-SampTTest, 1-/2-PropZTest, Z/T intervals, 2-sample and proportion intervals, χ²-Test, χ²GOF-Test, 2-SampFTest, LinRegTTest, LinRegTInt, ANOVA, each with an input screen
- **Stat plots:** three plots (scatter, xyLine, histogram, modified box plot, box plot) with ZoomStat and TRACE
- **Distributions:** normal, t, χ², F, binomial, Poisson and geometric pdf/cdf, `invNorm(`, `invT(`, and shaded-area drawings
- **VARS → Statistics:** every result (x̄, Sx, r, p, RegEQ, …) can be used in formulas
- **Matrices:** `[A]`–`[C]` with an editor, `det(`, transpose, inverse, `identity(`
- **Programs and drawing:** short programs with `Disp`; ClrDraw, Line, Horizontal, Vertical, Circle
- **Other:** MODE (Float/Fix, Sci/Eng, Radian/Degree), angle conversions, RCL, catalog, and keyboard input
- **Calculator-only view:** turns on automatically on phones; open it anywhere with `#calc`, e.g. `https://juanpablohoyosc.github.io/Razorcalc/#calc`

Memory is saved in the browser's local storage.

## Deploying

Pushing to `main` runs `.github/workflows/pages.yml`, which publishes `index.html` to GitHub Pages. In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**.

---

Razorcalc is an independent student project. It is not affiliated with, sponsored by, or endorsed by the University of Arkansas or its athletics programs.
