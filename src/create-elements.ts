export function appendRandomList(container: HTMLElement) {
  const intialList = createInitialList(60);
  const items = formatListIntoColumns(intialList, 4);

  items.forEach((row, rowIndex) => {
    const fragment = new DocumentFragment()
    row.forEach((item, columnIndex) => {
      const li = document.createElement("li");
      li.dataset["position"] = `${rowIndex},${columnIndex}`;
      // li.style.backgroundColor = item.color;
      li.style.outline = `solid 1px ${item.color}`;
      li.style.width = `${item.width}px`;
      li.style.height = `${item.height}px`;

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


