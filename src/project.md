---
title: Project Sketches
---

<details>
  <summary>Click me</summary>
  
![Lorem Picsom](https://picsum.photos/200)
</details>

<div class="grid grid-cols-3">
<div class="card red">A</div>
<div class="card blue">B</div>
<div class="card green">C</div>
<div class="card grid-colspan-3 yellow">D</div>
<div class="card red">E</div>
<div class="card blue">F</div>
<div class="card green">G</div>
</div>

```js
const arr = "foo jar bin".split(" ");
```

```js
const len = view(Inputs.range([0, arr.length], { step: 1 }));
```

${arr.slice(0, len).join()}

```js
const myZip = await FileAttachment("./data/gapminder.zip").zip();
```

```js
const myCsv = myZip.file("gapminder/continents.csv").csv();
```

${Inputs.table(myCsv)}

```js
display(myCsv.map((e) => e.Entity));
```

```js
const life2010 = await FileAttachment("./data/life-2010.csv").csv({
  typed: true,
});
```

${Inputs.table(life2010)}

```js
const gdp2010 = await FileAttachment("./data/gdp-2010.csv").csv({
  typed: true,
});
```

${Inputs.table(gdp2010)}

```js
const color = view(Inputs.radio(["steelblue", "tomato", "seagreen"], {
  label: "Dot color",
  value: "steelblue"
}));
```

```js
// join the two datasets on Entity
const joined = life2010.flatMap(l => {
  const g = gdp2010.find(d => d.Entity === l.Entity);
  return g ? [{ entity: l.Entity, lifeExp: +l["Life expectancy"], gdp: +g["GDP per capita"] }] : [];
});

const width = 640, height = 400;
const margin = { top: 20, right: 20, bottom: 50, left: 60 };

const x = d3.scaleLog()
  .domain(d3.extent(joined, d => d.gdp))
  .range([margin.left, width - margin.right]);

const y = d3.scaleLinear()
  .domain(d3.extent(joined, d => d.lifeExp))
  .range([height - margin.bottom, margin.top]);

const svg = d3.create("svg").attr("width", width).attr("height", height);

// x axis
svg.append("g")
  .attr("transform", `translate(0,${height - margin.bottom})`)
  .call(d3.axisBottom(x).ticks(5, "~s"))
  .append("text")
  .attr("x", width / 2).attr("y", 40)
  .attr("fill", "currentColor").attr("text-anchor", "middle")
  .text("GDP per capita");

// y axis
svg.append("g")
  .attr("transform", `translate(${margin.left},0)`)
  .call(d3.axisLeft(y))
  .append("text")
  .attr("x", -height / 2).attr("y", -45)
  .attr("fill", "currentColor").attr("text-anchor", "middle")
  .attr("transform", "rotate(-90)")
  .text("Life expectancy");

// dots
svg.selectAll("circle")
  .data(joined)
  .join("circle")
  .attr("cx", d => x(d.gdp))
  .attr("cy", d => y(d.lifeExp))
  .attr("r", 4)
  .attr("fill", color)
  .attr("opacity", 0.7);

display(svg.node());
```
