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

  if (colummsPerRow === 0) {
    // leave it as it is;
    return;
  }

  let elementIndex = 0;
  let rowIndex = 0;
  while (rowIndex < elements.length) {
    const columnIndex = rowIndex / colummsPerRow;
    const subset = elements.slice(rowIndex, rowIndex+colummsPerRow);

    subset.forEach((el, index) => {
      el.style.width = `${columnWidth}px`;
      el.style.position = "absolute";
      el.style.left = `${index + index*columnWidth + (gap * index)}px`;
      
      if (columnIndex > 0) {
        const previousElement = elements[elementIndex - colummsPerRow];
        const top = getPreviousTop(previousElement);
        const height = previousElement.clientHeight;
        el.style.top = `${top + height + gap}px`;
      }

      elementIndex += 1
    });
    
    
    rowIndex += colummsPerRow;
  }
}

function getPreviousTop(el: HTMLElement): number {
  const match = el.style.top.match(/\d+/);
  return match ? Number(match[0]) : 0;
}

function appendRandomList(container: HTMLElement) {
  const intialList = createInitialList(60);
  // console.log(intialList);

  const items = formatListIntoColumns(intialList, 4);
  // console.log(items);

  items.forEach((row, rowIndex) => {
    const fragment = new DocumentFragment()
    // const elements = [];
    row.forEach((item, columnIndex) => {
      const li = document.createElement("li");
      li.dataset["position"] = `${rowIndex},${columnIndex}`;
      // li.style.backgroundColor = item.color;
      li.style.outline = `solid 1px ${item.color}`;
      li.style.width = `${item.width}px`;
      li.style.height = `${item.height}px`;

      // const columnMax = (columnIndex + 1) * rowWidth;
      // const columnMin = columnMax - rowWidth + 1;
      // li.style.gridColumn = `${columnMin} / ${columnMax}`
      
      // li.style.height = `${item.height}px`;
      // li.style.gridRow = `${} / ${}`;

      fragment.appendChild(li);
    });
    container.appendChild(fragment);
  });
}

interface ItemInfo {
  width: number,
  height: number,
  color: string,
}

function createInitialList(size: number): ItemInfo[] {
  const list = [];
  for (let i = 0; i < size; i++) {
    const size = {
      width: getRandomIntInclusive(320, 500),
      height: getRandomIntInclusive(400, 700),
      color:  randomColor(),
    };
    list.push(size);
  }
  return list;
}

function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function randomColor() {
  let color = '#';
  for (let i = 0; i < 6; i++){
     const random = Math.random();
     const bit = (random * 16) | 0;
     color += (bit).toString(16);
  };
  return color;
}

function formatListIntoColumns(items: ItemInfo[], columns: number) {  
  const result: ItemInfo[][] = [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const insertIndex = Math.trunc(i / columns);

    if (result.length === insertIndex) {
      result.push([]);
    }

    result[insertIndex].push(item);
  }

  return result;
}


