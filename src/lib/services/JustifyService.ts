
const FINAL_LINE_LENGTH = 80;

class JustifyService {

    // Split the text into words, then concatenate the words (separator equal to space) to have lines equal or
    // less than 80 characters.
    // In case of a line which is less than 80 characters, complete the line with spaces to have a 80 characters line long,
    // here, we loop through the spaces and add a space for the previous spaces until the line reaches 80 characters long.
    // At the end of each line a newLine character (\n) is added.
    // NewLine characters from the original text are kept, not removed.
    public justifyText(text: string): string {
        const textArray = text.trim().split(' ');
        let justifiedText = '';
        let line = '';

        while (textArray.length > 0 ) {
            const word = textArray[0];

            // Empty spaces are omitted
            if (word === '') {
                textArray.shift();
                continue;
            }

            // When Line is less than 80 characters
            if (line.length + word.length < FINAL_LINE_LENGTH) {
                line += word + ' ';
                textArray.shift();

            // When Line is equal 80 characters
            } else if (line.length + word.length === FINAL_LINE_LENGTH) {
                line += word;
                textArray.shift();
                justifiedText += line + '\n';
                line = '';

            // When line is greater than 80 characters
            } else {
                justifiedText += addSpacesToJustify(line) + '\n';
                line = '';
            }
        }

        // Line standing alone at the end of the paragraph
        if (line.length > 0) {
            justifiedText += line;
        }

        return justifiedText;
    }
}

// Calculate the remaining space in a specified line and fill it with spaces to reach 80 characters line long.
const addSpacesToJustify = (line: string) => {
    let remainingSpace = FINAL_LINE_LENGTH - line.length;
    let lineArray = line.split('');

    while (remainingSpace >= 0) {
        lineArray = lineArray.map(char => {
            if (remainingSpace >= 0 && /\s/.test(char)) {
                remainingSpace--;
                return char + ' ';
            }
            return char;
        });
    }

    return lineArray.join('');
};

export default JustifyService;
