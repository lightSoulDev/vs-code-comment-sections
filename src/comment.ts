import { workspace } from "vscode";

const comment = (selection: string): string => {
  const userParams = workspace.getConfiguration("coolcommentsections.params");

  let divider: string = userParams.get("divider") ?? "=-";
  let blockLenght: number = userParams.get("blockLenght") ?? 50;
  let adjust: boolean = userParams.get("adjust") ?? true;
  let formatSelection: boolean = userParams.get("formatSelection") ?? true;
  let singleLine: boolean = userParams.get("singleLine") ?? false;

  let comment: string = "";

  let maxWidth: number = blockLenght - (adjust ? (divider.length + 1) % 2 : 0);
  let width: number = maxWidth;
  let maxSelectionLenght: number = width - divider.length * 2 - 2;

  let dividerLine: string = `${divider
    .repeat(Math.ceil(width / divider.length))
    .slice(0, width)}`;

  let commentContents = [];

  for (let selectionLine of selection.split("\n")) {
    if (formatSelection)
      selectionLine = selectionLine.toUpperCase().split("").join(" ");
    selectionLine = selectionLine.slice(0, maxSelectionLenght);

    let selectionLenght: number = selectionLine.length;
    let rightSide: number = Math.ceil(
      (width - selectionLenght - divider.length * 2) / 2
    );
    let leftSide: number =
      width - rightSide - selectionLenght - divider.length * 2;

    let contentFiller = singleLine ? divider : " ";

    let content: string = `${divider}${
      contentFiller
        .repeat(Math.ceil(leftSide / contentFiller.length))
        .slice(0, leftSide - 1) +
      " " +
      selectionLine +
      " " +
      contentFiller
        .repeat(Math.ceil(rightSide / contentFiller.length))
        .slice(0, rightSide - 1)
    }${divider.split("").reverse().join("")}`;

    commentContents.push(content);
  }

  if (singleLine) comment = commentContents.join("\n");
  else
    comment = `${dividerLine}\n${commentContents.join("\n")}\n${dividerLine}`;

  return comment;
};

export default comment;
