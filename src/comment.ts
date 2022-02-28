/*
    @author: lightSoulDev (justpd)
    @version: 1.0.0
    @since: 28.02.2022
*/

import { workspace } from 'vscode';
import {
    DEFAULT_ADJUST,
    DEFAULT_BLOCK_LENGHT,
    DEFAULT_DIVIDER,
    DEFAULT_FORMAT_SELECTION,
    DEFAULT_SINGLE_LINE,
    NAME,
    PARAM_ADJUST,
    PARAM_BLOCK_LENGHT,
    PARAM_DIVIDER,
    PARAM_FORMAT_SELECTION,
    PARAM_SINGLE_LINE
} from './consts';

const comment = (selection: string): string => {
    const userParams = workspace.getConfiguration(`${NAME}.params`);

    let blockLenght: number =
        userParams.get(PARAM_BLOCK_LENGHT) ?? DEFAULT_BLOCK_LENGHT;
    let divider: string = userParams.get(PARAM_DIVIDER) ?? DEFAULT_DIVIDER;
    let singleLine: boolean =
        userParams.get(PARAM_SINGLE_LINE) ?? DEFAULT_SINGLE_LINE;
    let adjust: boolean = userParams.get(PARAM_ADJUST) ?? DEFAULT_ADJUST;
    let formatSelection: boolean =
        userParams.get(PARAM_FORMAT_SELECTION) ?? DEFAULT_FORMAT_SELECTION;

    let comment: string = '';

    let maxWidth: number =
        blockLenght - (adjust ? (divider.length + 1) % 2 : 0);
    let width: number = maxWidth;
    let maxSelectionLenght: number = width - divider.length * 2 - 2;

    let dividerLine: string =
        // '${LINE_COMMENT} ' +
        divider.repeat(Math.ceil(width / divider.length)).slice(0, width);

    let contents = [];

    for (let selectionLine of selection.split('\n')) {
        if (formatSelection)
            selectionLine = selectionLine.toUpperCase().split('').join(' ');
        selectionLine = selectionLine.slice(0, maxSelectionLenght);

        let selectionLenght: number = selectionLine.length;
        let rightSide: number = Math.ceil(
            (width - selectionLenght - divider.length * 2) / 2
        );
        let leftSide: number =
            width - rightSide - selectionLenght - divider.length * 2;

        let contentFiller = singleLine ? divider : ' ';
        let contentFillerLeft =
            contentFiller
                .repeat(Math.ceil(leftSide / contentFiller.length))
                .slice(0, leftSide - 1) + ' ';
        let contentFillerRight =
            ' ' +
            contentFiller
                .repeat(Math.ceil(rightSide / contentFiller.length))
                .slice(0, rightSide - 1);

        let content: string = `${divider}${
            contentFillerLeft + selectionLine + contentFillerRight
        }${divider.split('').reverse().join('')}`;

        contents.push(content);
    }

    if (singleLine) {
        comment = contents.join('\n');
    } else {
        comment = `${dividerLine}\n${contents.join('\n')}\n${dividerLine}`;
    }

    return comment;
};

export default comment;
