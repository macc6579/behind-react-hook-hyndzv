const React = (function() {
  let hooks = [];
  let idx = 0;

  return {
    render(Component) {
      const C = Component(); // render effects
      C.render();
      idx = 0; // reset for next render
      return C;
    },
    useEffect(cb, depArray) {
      const hasNoDeps = !depArray;
      const deps = hooks[idx]; // undefined when first render
      const _idx = idx;
      const hasChanged = deps
        ? !depArray.every((el, i) => el === deps[i])
        : true;
      if (hasNoDeps || hasChanged) {
        cb();
        hooks[_idx] = depArray;
      }
      idx++;
    },
    useState(initVal) {
      const state = hooks[idx] || initVal;
      const _idx = idx;
      const setState = newVal => {
        hooks[_idx] = newVal;
      };
      idx++;
      return [state, setState];
    }
  };
})();

function Component() {
  const [count, setCount] = React.useState(1);
  const [text, setText] = React.useState("apple");
  React.useEffect(() => console.log("effect", count), [count]);

  return {
    render() {
      console.log("render", { count, text });
    },
    click() {
      setCount(count + 1);
    },
    type(text) {
      setText(text);
    }
  };
}

// every rerendoer
var App = React.render(Component);

App.click();
var App = React.render(Component);

App.type("pear");
var App = React.render(Component);
