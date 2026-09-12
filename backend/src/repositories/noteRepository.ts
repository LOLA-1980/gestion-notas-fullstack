import { prisma } from "../config/database";

export class NoteRepository {

  async findAll() {
    return prisma.note.findMany({
      include: {
        categories: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findActive() {
    return prisma.note.findMany({
      where: {
        archived: false,
      },
      include: {
        categories: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findArchived() {
    return prisma.note.findMany({
      where: {
        archived: true,
      },
      include: {
        categories: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: number) {
    return prisma.note.findUnique({
      where: {
        id,
      },
      include: {
        categories: true,
      },
    });
  }

  async findByCategory(categoryId: number) {
    return prisma.note.findMany({
      where: {
        categories: {
          some: {
            id: categoryId,
          },
        },
      },
      include: {
        categories: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async create(data: {
    title: string;
    content: string;
  }) {
    return prisma.note.create({
      data,
      include: {
        categories: true,
      },
    });
  }

  async update(
    id: number,
    data: {
      title?: string;
      content?: string;
      archived?: boolean;
      categoryIds?: number[];
    }
  ) {

    const {
      categoryIds,
      ...noteData
    } = data;

    return prisma.note.update({

      where: {
        id,
      },

      data: {

        ...noteData,

        ...(categoryIds !== undefined && {
          categories: {
            set: categoryIds.map((id) => ({
              id,
            })),
          },
        }),

      },

      include: {
        categories: true,
      },

    });

  }

  async addCategory(
    noteId: number,
    categoryId: number
  ) {
    return prisma.note.update({
      where: {
        id: noteId,
      },
      data: {
        categories: {
          connect: {
            id: categoryId,
          },
        },
      },
      include: {
        categories: true,
      },
    });
  }

  async removeCategory(
    noteId: number,
    categoryId: number
  ) {
    return prisma.note.update({
      where: {
        id: noteId,
      },
      data: {
        categories: {
          disconnect: {
            id: categoryId,
          },
        },
      },
      include: {
        categories: true,
      },
    });
  }

  async delete(id: number) {
    return prisma.note.delete({
      where: {
        id,
      },
    });
  }

}