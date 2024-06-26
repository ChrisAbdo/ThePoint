export const introMessage = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: {
        level: 1,
      },
      content: [
        {
          type: "text",
          text: "Welcome to The Point.",
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        level: 2,
      },
      content: [
        {
          type: "text",
          text: "Share long, written technical content and get straight to the point.",
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        level: 3,
      },
      content: [
        {
          type: "text",
          text: "This platform uses markdown format to easily style and format your text. You can also drag images in to the editor.",
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        level: 4,
      },
      content: [
        {
          type: "text",
          text: "For a guide on how to use markdown please visit ",
        },
        {
          type: "text",
          text: "this link",
          marks: [
            {
              type: "link",
              attrs: {
                rel: "noopener noreferrer nofollow",
                href: "https://www.markdownguide.org/basic-syntax/",
                class:
                  "text-muted-foreground underline underline-offset-[3px] hover:text-primary transition-colors cursor-pointer",
                target: "_blank",
              },
            },
          ],
        },
        {
          type: "text",
          text: ".",
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        level: 4,
      },
      content: [
        {
          type: "text",
          text: 'Alternatively, you can use the "/" key to pull up a menu.',
        },
      ],
    },
    {
      type: "bulletList",
      attrs: {
        tight: true,
      },
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Easily share content that requires detailed steps",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Simply sign in with a popular provider and start making Points",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Share your point with others instantly!",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "codeBlock",
      attrs: {
        language: null,
      },
      content: [
        {
          type: "text",
          text: "Did I mention you can also do codeblocks?",
        },
      ],
    },
    {
      type: "paragraph",
    },
    {
      type: "paragraph",
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "This wonderful editor (Novel) was built by ",
        },
        {
          type: "text",
          text: "Steven Tey",
          marks: [
            {
              type: "link",
              attrs: {
                rel: "noopener noreferrer nofollow",
                href: "https://github.com/steven-tey/novel",
                class:
                  "text-muted-foreground underline underline-offset-[3px] hover:text-primary transition-colors cursor-pointer",
                target: "_blank",
              },
            },
          ],
        },
      ],
    },
    {
      type: "paragraph",
    },
  ],
};
