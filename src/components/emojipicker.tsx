import { Flex, Button, Popover, Box, Text, Layer, FixedZIndex } from "gestalt";
import * as React from "react"

// Filtered list from https://github.com/chalda-pnuzig/emojis.json/blob/master/src/list.json
const AVAILABLE_EMOJI: string[] = `😀,😃,😄,😁,😆,😅,🤣,😂,🙂,🙃,😉,😊,😇,🥰,😍,🤩,😘,😗,☺,😚,😙,😋,😛,😜,🤪,😝,🤑,🤗,🤭,🤫,🤔,🤐,🤨,😐,😑,😶,😏,😒,🙄,😬,🤥,😌,😔,😪,🤤,😴,😷,🤒,🤕,🤢,🤮,🤧,🥵,🥶,🥴,😵,🤯,🤠,🥳,😎,🤓,🧐,😕,😟,🙁,☹,😮,😯,😲,😳,🥺,😦,😧,😨,😰,😥,😢,😭,😱,😖,😣,😞,😓,😩,😫,🥱,😤,😡,😠,🤬,😈,👿,💀,☠,💩,🤡,👹,👺,👻,👽,👾,🤖,😺,😸,😹,😻,😼,😽,🙀,😿,😾,🙈,🙉,🙊,💌,💘,💝,💖,💗,💓,💞,💕,💟,❣,💔,❤,🧡,💛,💚,💙,💜,🤎,🖤,🤍,💋,💯,💢,💥,💫,💦,💨,🕳,💬,🗨,🗯,💭,💤,👋,🤚,🖐,✋,🖖,👌,🤏,✌,🤞,🤟,🤘,🤙,👈,👉,👆,🖕,👇,☝,👍,👎,✊,👊,🤛,🤜,👏,🙌,👐,🤲,🤝,🙏,✍,💅,🤳,💪,🦾,🦿,🦵,🦶,👂,🦻,👃,🧠,🦷,🦴,👀,👁,👅,👄,👶,🧒,👦,👧,🧑,👱,👨,🧔,👨‍🦰,👨‍🦱,👨‍🦳,👨‍🦲,👩,👩‍🦰,👩‍🦱,👩‍🦳,👩‍🦲,🧓,👴,👵,🙍,🙎,🙅,🙆,💁,🙋,🧏,🙇,🤦,🤷,👨‍🎓,👩‍🎓,👨‍🏫,👩‍🏫,👨‍🌾,👩‍🌾,👨‍🍳,👩‍🍳,👨‍🔧,👩‍🔧,👨‍🏭,👩‍🏭,👨‍💼,👩‍💼,👨‍🔬,👩‍🔬,👨‍💻,👩‍💻,👨‍🎤,👩‍🎤,👨‍🎨,👩‍🎨,👨‍🚀,👩‍🚀,👨‍🚒,👩‍🚒,👮,🕵,💂,👷,🤴,👸,👳,👲,🧕,🤵,👰,🤰,🤱,👼,🎅,🤶,🦸,🦹,🧙,🧚,🧛,🧜,🧝,🧞,🧟,💆,💇,🚶,🧍,🧎,👨‍🦼,👩‍🦼,👨‍🦽,👩‍🦽,🏃,💃,🕺,🕴,👯,🧖,🧗,🤺,🏇,⛷,🏂,🏌,🏄,🚣,🏊,⛹,🏋,🚴,🚵,🤸,🤼,🤽,🤾,🤹,🧘,🛀,🛌,👭,👫,👬,💏,💑,👪,👨‍👦,👨‍👧,👩‍👦,👩‍👧,🗣,👤,👥,👣,🦰,🦱,🦳,🦲,🐵,🐒,🦍,🦧,🐶,🐕,🦮,🐕‍🦺,🐩,🐺,🦊,🦝,🐱,🐈,🦁,🐯,🐅,🐆,🐴,🐎,🦄,🦓,🦌,🐮,🐂,🐃,🐄,🐷,🐖,🐗,🐽,🐏,🐑,🐐,🐪,🐫,🦙,🦒,🐘,🦏,🦛,🐭,🐁,🐀,🐹,🐰,🐇,🐿,🦔,🦇,🐻,🐨,🐼,🦥,🦦,🦨,🦘,🦡,🐾,🦃,🐔,🐓,🐣,🐤,🐥,🐦,🐧,🕊,🦅,🦆,🦢,🦉,🦩,🦚,🦜,🐸,🐊,🐢,🦎,🐍,🐲,🐉,🦕,🦖,🐳,🐋,🐬,🐟,🐠,🐡,🦈,🐙,🐚,🐌,🦋,🐛,🐜,🐝,🐞,🦗,🕷,🕸,🦂,🦟,🦠,💐,🌸,💮,🏵,🌹,🥀,🌺,🌻,🌼,🌷,🌱,🌲,🌳,🌴,🌵,🌾,🌿,☘,🍀,🍁,🍂,🍃,🍄,🍇,🍈,🍉,🍊,🍋,🍌,🍍,🥭,🍎,🍏,🍐,🍑,🍒,🍓,🥝,🍅,🥥,🥑,🍆,🥔,🥕,🌽,🌶,🥒,🥬,🥦,🧄,🧅,🥜,🌰,🍞,🥐,🥖,🥨,🥯,🥞,🧇,🧀,🍖,🍗,🥩,🥓,🍔,🍟,🍕,🌭,🥪,🌮,🌯,🥙,🧆,🥚,🍳,🥘,🍲,🥣,🥗,🍿,🧈,🧂,🥫,🍱,🍘,🍙,🍚,🍛,🍜,🍝,🍠,🍢,🍣,🍤,🍥,🥮,🍡,🥟,🥠,🥡,🦀,🦞,🦐,🦑,🦪,🍦,🍧,🍨,🍩,🍪,🎂,🍰,🧁,🥧,🍫,🍬,🍭,🍮,🍯,🍼,🥛,☕,🍵,🍶,🍾,🍷,🍸,🍹,🍺,🍻,🥂,🥃,🥤,🧃,🧉,🧊,🥢,🍽,🍴,🥄,🔪,🏺,🌍,🌎,🌏,🌐,🗺,🗾,🧭,🏔,⛰,🌋,🗻,🏕,🏖,🏜,🏝,🏞,🏟,🏛,🏗,🧱,🏘,🏚,🏠,🏡,🏢,🏣,🏤,🏥,🏦,🏨,🏩,🏪,🏫,🏬,🏭,🏯,🏰,💒,🗼,🗽,⛪,🕌,🛕,🕍,⛩,🕋,⛲,⛺,🌁,🌃,🏙,🌄,🌅,🌆,🌇,🌉,♨,🎠,🎡,🎢,💈,🎪,🚂,🚃,🚄,🚅,🚆,🚇,🚈,🚉,🚊,🚝,🚞,🚋,🚌,🚍,🚎,🚐,🚑,🚒,🚓,🚔,🚕,🚖,🚗,🚘,🚙,🚚,🚛,🚜,🏎,🏍,🛵,🦽,🦼,🛺,🚲,🛴,🛹,🚏,🛣,🛤,🛢,⛽,🚨,🚥,🚦,🛑,🚧,⚓,⛵,🛶,🚤,🛳,⛴,🛥,🚢,✈,🛩,🛫,🛬,🪂,💺,🚁,🚟,🚠,🚡,🛰,🚀,🛸,🛎,🧳,⌛,⏳,⌚,⏰,⏱,⏲,🕰,🕛,🕧,🕐,🕜,🕑,🕝,🕒,🕞,🕓,🕟,🕔,🕠,🕕,🕡,🕖,🕢,🕗,🕣,🕘,🕤,🕙,🕥,🕚,🕦,🌑,🌒,🌓,🌔,🌕,🌖,🌗,🌘,🌙,🌚,🌛,🌜,🌡,☀,🌝,🌞,🪐,⭐,🌟,🌠,🌌,☁,⛅,⛈,🌤,🌥,🌦,🌧,🌨,🌩,🌪,🌫,🌬,🌀,🌈,🌂,☂,☔,⛱,⚡,❄,☃,⛄,☄,🔥,💧,🌊,🎃,🎄,🎆,🎇,🧨,✨,🎈,🎉,🎊,🎋,🎍,🎎,🎏,🎐,🎑,🧧,🎀,🎁,🎗,🎟,🎫,🎖,🏆,🏅,🥇,🥈,🥉,⚽,⚾,🥎,🏀,🏐,🏈,🏉,🎾,🥏,🎳,🏏,🏑,🏒,🥍,🏓,🏸,🥊,🥋,🥅,⛳,⛸,🎣,🤿,🎽,🎿,🛷,🥌,🎯,🪀,🪁,🔫,🎱,🔮,🎮,🕹,🎰,🎲,🧩,🧸,♠,♥,♦,♣,♟,🃏,🀄,🎴,🎭,🖼,🎨,🧵,🧶,👓,🕶,🥽,🥼,🦺,👔,👕,👖,🧣,🧤,🧥,🧦,👗,👘,🥻,🩱,🩲,🩳,👙,👚,👛,👜,👝,🛍,🎒,👞,👟,🥾,🥿,👠,👡,🩰,👢,👑,👒,🎩,🎓,🧢,⛑,📿,💄,💍,💎,🔇,🔈,🔉,🔊,📢,📣,📯,🔔,🔕,🎼,🎵,🎶,🎙,🎚,🎛,🎤,🎧,📻,🎷,🎸,🎹,🎺,🎻,🪕,🥁,📱,📲,☎,📞,📟,📠,🔋,🔌,💻,🖥,🖨,⌨,🖱,🖲,💽,💾,💿,📀,🧮,🎥,🎞,📽,🎬,📺,📷,📸,📹,📼,🔍,🔎,🕯,💡,🔦,🏮,🪔,📔,📕,📖,📗,📘,📙,📚,📓,📒,📃,📜,📄,📰,🗞,📑,🔖,🏷,💰,💴,💵,💶,💷,💸,💳,🧾,💹,✉,📧,📨,📩,📤,📥,📦,📫,📪,📬,📭,📮,🗳,✏,✒,🖋,🖊,🖌,🖍,📝,💼,📁,📂,🗂,📅,📆,🗒,🗓,📇,📈,📉,📊,📋,📌,📍,📎,🖇,📏,📐,✂,🗃,🗄,🗑,🔒,🔓,🔏,🔐,🔑,🗝,🔨,🪓,⛏,⚒,🛠,🗡,⚔,💣,🏹,🛡,🔧,🔩,⚙,🗜,⚖,🦯,🔗,⛓,🧰,🧲,⚗,🧪,🧫,🧬,🔬,🔭,📡,💉,🩸,💊,🩹,🩺,🚪,🛏,🛋,🪑,🚽,🚿,🛁,🪒,🧴,🧷,🧹,🧺,🧻,🧼,🧽,🧯,🛒,🚬,⚰,⚱,🧿,🗿,🏧,🚮,🚰,♿,🚹,🚺,🚻,🚼,🚾,🛂,🛃,🛄,🛅,⚠,🚸,⛔,🚫,🚳,🚭,🚯,🚱,🚷,📵,🔞,☢,☣,⬆,↗,➡,↘,⬇,↙,⬅,↖,↕,↔,↩,↪,⤴,⤵,🔃,🔄,🔙,🔚,🔛,🔜,🔝,🛐,⚛,🕉,✡,☸,☯,✝,☦,☪,☮,🕎,🔯,♈,♉,♊,♋,♌,♍,♎,♏,♐,♑,♒,♓,⛎,🔀,🔁,🔂,▶,⏩,⏭,⏯,◀,⏪,⏮,🔼,⏫,🔽,⏬,⏸,⏹,⏺,⏏,🎦,🔅,🔆,📶,📳,📴,✖,➕,➖,➗,♾,‼,⁉,❓,❔,❕,❗,〰,💱,💲,♻,⚜,🔱,📛,🔰,⭕,✅,☑,✔,❌,❎,➰,➿,〽,✳,✴,❇,©,®,™,#️⃣,*️⃣,0️⃣,1️⃣,2️⃣,3️⃣,4️⃣,5️⃣,6️⃣,7️⃣,8️⃣,9️⃣,🔟,🔠,🔡,🔢,🔣,🔤,🅰,🆎,🅱,🆑,🆒,🆓,ℹ,🆔,Ⓜ,🆕,🆖,🅾,🆗,🅿,🆘,🆙,🆚,🈁,🈂,🈷,🈶,🈯,🉐,🈹,🈚,🈲,🉑,🈸,🈴,🈳,㊗,㊙,🈺,🈵,🔴,🟠,🟡,🟢,🔵,🟣,🟤,⚫,⚪,🟥,🟧,🟨,🟩,🟦,🟪,🟫,⬛,⬜,◼,◻,◾,◽,▪,▫,🔶,🔷,🔸,🔹,🔺,🔻,💠,🔘,🔳,🔲`.split(",");


export function EmojiPicker({ value, onClick }: { value: string, onClick: (val: string) => void }) {

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    console.log("OPEN", open)

    React.useEffect(() => {
        setOpen(false);
    }, []);

    return <React.Fragment>
        <Button
            accessibilityHaspopup
            accessibilityExpanded={open}
            // accessibilityControls="main-example"
            color="white"
            iconEnd="arrow-down"
            onClick={() => setOpen(!open)}
            size="lg"
            selected={open}
            text={value}
            ref={anchorRef}
        />
        {open && (
            <Layer zIndex={new FixedZIndex(12)} >
                <Popover
                    accessibilityLabel="Save to board"
                    anchor={anchorRef.current}
                    id="main-example"
                    idealDirection="forceDown"
                    onDismiss={() => setOpen(false)}
                    size="xl"
                    showDismissButton
                    positionRelativeToAnchor={false}
                >
                    <Box width={300}>
                        <Text align="center" weight="bold">Emoji Picker</Text>
                        <EmojiGrid onSelect={val => {onClick(val); setOpen(false)}} />
                    </Box>
                </Popover></Layer>
        )}</React.Fragment>
}

const ROWS = 5;
const COLS = 6;
const PAGE_SIZE = ROWS * COLS;

function EmojiGrid({ onSelect }: { onSelect: (val: string) => void }) {
    const [offset, setOffset] = React.useState(0);

    const emojiList = AVAILABLE_EMOJI.slice(offset, offset + PAGE_SIZE);
    const emojiGrid: string[][] = [];
    for (let x = 0; x < ROWS; x++) {
        emojiGrid.push(emojiList.slice(COLS * x, COLS * (x + 1)))
    }

    return <React.Fragment>
        <Flex justifyContent="around" width="100%">
            <Button color="gray" iconEnd="directional-arrow-left" text="" onClick={()=>setOffset(offset - PAGE_SIZE)} disabled={offset==0} size="md"/>
            <Box width="4em" marginTop={2}><Text align="center">{offset/PAGE_SIZE}</Text></Box>
            <Button color="gray" iconEnd="directional-arrow-right" text="" onClick={()=>setOffset(offset + PAGE_SIZE)} disabled={offset + PAGE_SIZE>= AVAILABLE_EMOJI.length }  size="md"/>
        </Flex>
        <table width="100%" style={{padding: "5px"}}>
            {
                emojiGrid.map((row, r) => <tr key={r}>
                    {row.map((cell, c) => <td key={c} onClick={evt => onSelect(cell)} className="emoji-cell"><Text size="400" align="center">{cell}</Text></td>)}
                </tr>)
            }
        </table>
    </React.Fragment>
}