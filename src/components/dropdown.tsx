import * as React from "react";
import {
    Button,
    CompositeZIndex,
    Dropdown,
    DropdownOption,
    FixedZIndex,
} from 'gestalt';


const PAGE_HEADER_ZINDEX = new FixedZIndex(11);

export function MyDropdown(props: { value: string, options: DropdownOption[], onClose: (type: string) => void, label:(selected:string)=>string }) {
    const [open, setOpen] = React.useState(false);
    const x = props.options.filter(o => o.value == props.value)[0];
    const [selected, setSelected] = React.useState(x);
    const anchorRef = React.useRef(null);

    const onSelect = ({ item }) => {
        setSelected(item);
        setOpen(false);
        props.onClose(item.value);
    };

    const options = props.options.map(t => <Dropdown.Item
        key={t.label}
        option={t}
        onSelect={onSelect}
        selected={selected}
    />
    )

    return (
        <React.Fragment>
            <Button
                accessibilityControls="column-type-dropdown"
                accessibilityExpanded={open}
                accessibilityHaspopup
                iconEnd="arrow-down"
                onClick={() => setOpen((prevVal) => !prevVal)}
                ref={anchorRef}
                selected={open}
                size="md"
                text={props.label(selected.value)}
            />
            {open && (
                <Dropdown
                    anchor={anchorRef.current}
                    id="column-type-dropdown"
                    onDismiss={() => setOpen(false)}
                    zIndex={new CompositeZIndex([PAGE_HEADER_ZINDEX])}
                >
                    {options}
                </Dropdown>
            )}
        </React.Fragment>
    );
}