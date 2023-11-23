import { Flex, Box, Button } from "gestalt";
import * as React from "react";
import { useDispatch } from "react-redux";
import { importAction } from "../state/store";

export function ImportButton() {
    const dispatch = useDispatch();

    function importFunc(evt) {
        loadFile(evt, data => {
            if(evt && evt.target && evt.target.files && evt.target.files.length >0){
                //  title: evt.target.files[0].name
                dispatch(importAction({ data }))
                console.log("data",data)
            }
        });
    }

    return <Flex>
        <div className="file-input-container">
        <input className="file-input" type="file" name="resume" onChange={importFunc} />
        <Button text="Import" size="lg"/>
        </div>
       </Flex>
}

function loadFile(evt: React.ChangeEvent<HTMLInputElement>, callback: (data: string) => any) {
    if (evt.target.files) {
        var reader = new FileReader();
        reader.onload = function (evt) {
            if (!evt.target || evt.target.readyState != 2) return;
            if (evt.target.error) {
                alert('Error while reading file');
                return;
            }
            if (evt.target.result) {
                callback(evt.target.result.toString());
            }
        };
        reader.readAsText(evt.target.files[0]);
    }
}