/* eslint-disable camelcase */

exports.up = (pgm) => {
    pgm.createTable("notes", {
        id: {
            type: "varchar(16)",
            primaryKey: true,
        },
        title: {
            type: "varchar(50)",
            notNull: true,
        },
        body: {
            type: "TEXT",
            notNull: true,
        },
        tags: {
            type: "TEXT[]",
            notNull: true,
        },
        created_at: {
            type: "TEXT",
            notNull: true,
        },
        updated_at: {
            type: "TEXT",
            notNull: true,
        },
    });
};

exports.down = (pgm) => {
    pgm.dropTable("notes");
};
