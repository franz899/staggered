import { appendRandomList } from "./create-elements";

const list = document.getElementById("list") as HTMLUListElement;

main();

function main() {
  appendRandomList(list);

  organiseByColumnWidth(list);
}

function organiseByColumnWidth(container: HTMLElement) {
  const elements = Array.from(container.children) as HTMLElement[];
  const columnWidth = Number(container.dataset.staggeredColumnWidth);
  const gap = Number(container.dataset.staggeredGap);
  const width = container.clientWidth;
  const colummsPerRow = Math.floor(width / columnWidth);

  let elementIndex = 0;
  let rowIndex = 0;
  while (rowIndex < elements.length) {
    const columnIndex = rowIndex / colummsPerRow;
    const subset = elements.slice(rowIndex, rowIndex + colummsPerRow);

    subset.forEach((el, index) => {
      el.style.width = `${columnWidth}px`;
      el.style.position = "absolute";
      el.style.left = `${index * columnWidth + gap * index}px`;

      if (columnIndex > 0) {
        const previousElement = elements[elementIndex - colummsPerRow];
        const top = getPreviousTop(previousElement);
        const height = previousElement.clientHeight;
        el.style.top = `${top + height + gap}px`;
      }

      elementIndex += 1;
    });

    rowIndex += colummsPerRow;
  }

  const lastFourElements = elements.slice(elements.length - colummsPerRow, -1);
  const maxHeight = getMaxHeightOf(lastFourElements);
  container.style.height = `${maxHeight}px`;
}

function removeStaggeredStyles(elements: HTMLElement[]) {
  elements.forEach((el) => {
    el.style.removeProperty("position");
    el.style.removeProperty("width");
    el.style.removeProperty("top");
    el.style.removeProperty("left");
    el.style.removeProperty("right");
  });
}

function getPreviousTop(el: HTMLElement): number {
  return parseNumber(el.style.top);
}

function parseNumber(x: number | string, defaultValue = 0) {
  if (typeof x === "number") {
    return x;
  }

  const match = x.match(/\d+/);
  return match ? Number(match[0]) : defaultValue;
}

function getMaxHeightOf(elements: HTMLElement[]) {
  let max = 0;

  elements.forEach((el) => {
    const h = parseNumber(el.style.top) + parseNumber(el.style.height);
    max = Math.max(max, h);
  });

  return max;
}
