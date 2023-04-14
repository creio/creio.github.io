import { Client } from "@notionhq/client";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()

    const body = await readBody(event);
    const notion = new Client({
        auth: config.NOTION_ACCESS_TOKEN
    });
    const formDatabaseId: string = config.NOTION_DATABASE ?? "";

    notion.pages.create({
        parent: { database_id: formDatabaseId },
        properties: {
            Name: {
                title: [{
                    text: { content: body.name }
                }]
            },
            Email: { email: body.email },
            Message: {
                rich_text: [{
                    text: { content: body.message }
                }]
            }
        }
    });
});
