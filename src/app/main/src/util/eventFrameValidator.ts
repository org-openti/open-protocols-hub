import type { WebFrameMain } from "electron";

import { isDev } from "./devUtilities.js";
import {pathToFileURL} from 'url'
import { getUIPath } from "./pathResolver.js";

export function validateEventFrame(frame: WebFrameMain | null) {

    if (!frame) {

        throw new Error('Frame is null: possible unauthorized event')
    }

        const stripHash = (urlStr: string) => {

        try {
            const parsed = new URL(urlStr);
            parsed.hash = "";
            return parsed.toString();
        } catch {
            return urlStr;
        }
    };


    const url = stripHash(frame.url)

    if (isDev() && new URL(url).host === 'localhost:5666') {

        return
    }

    const expectedUrl = stripHash(pathToFileURL(getUIPath()).toString())
    
    if (url !== expectedUrl) {

        throw new Error('Malicious event')
    }
}