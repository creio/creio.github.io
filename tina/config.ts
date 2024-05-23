import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "static",
  },
  media: {
    tina: {
      publicFolder: "assets",
      mediaRoot: "images",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "content/posts",
        defaultItem: () => {
          return {
            toc: true,
            edit: true,
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            label: "Description",
            name: "description",
            type: "string",
            ui: {
              component: "textarea"
            }
          },
          {
            label: 'Hero image',
            name: 'image',
            type: 'image',
          },
          {
            type: "datetime",
            name: "date",
            label: "Date Posted",
            required: true,
            initialValue: new Date().toLocaleString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }).replace("at", "").trim(),
            ui: {
              timeFormat: "HH:mm"
            },
          },
          {
            type: 'string',
            name: 'tags',
            label: 'Tags',
            list: true,
          },
          {
            type: 'string',
            name: 'categories',
            label: 'Categories',
            list: true,
          },
          {
            type: 'string',
            name: 'contributors',
            label: 'Contributors',
            list: true,
          },
          {
            type: 'boolean',
            name: 'draft',
            label: 'Draft'
          },
          {
            type: 'boolean',
            name: 'pinned',
            label: 'Pinned'
          },
          {
            type: 'boolean',
            name: 'toc',
            label: 'Toc'
          },
          {
            type: 'boolean',
            name: 'edit',
            label: 'Edit'
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});
