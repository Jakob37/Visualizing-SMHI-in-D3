# Visualizing SMHI using D3

D3 is a javascript library giving fine-grained control over data visualizations.

It can be loaded as a single javascript file. It has a somewhat arcane syntax, being related to the now extinct (?) jQuery. The advantage is that because so many people have been using it for so long, there are tons of tutorials and examples. Chances are that if you need a new chart, you can tweak an existing example.

It can easily be sources from `d3js.org`.

# Setting up the environment

In this exploration, I used VSCode with the extensions "Live Server" and "Prettier". Live Server let's me see the changes made to the chart while doing them, while prettier automatically formats the code in a systematic and pleasant way.

I needed to install node. To get this running, I use nvm.
https://github.com/coreybutler/nvm-windows/releases

```
nvm install 14
```

Now we can use npm and install types.

```
npm i --save-dev @types/d3
```

The auto-complete after d3 worked fine for me after this.

# Setting up the data

## Preparing the R environment

* Download R
* Download R studio
* Install the tidyverse packages










