export interface AntwoordData {
  antwoordId: number;
  content: string;
  userName: string;
  created: Date;
}

export interface VraagData {
  questionId: number;
  title: string;
  content: string;
  userName: string;
  created: Date;
  antwoorden: AntwoordData[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const vragen: VraagData[] = [
  {
    questionId: 1,
    title: 'Waarom zou ik FF XIV: Shadowbringers spelen?',
    content:
      'Ik heb veel goeie dingen over dat uitbreiding gehoord en staat momenteel op 91 op Metacritic',
    userName: 'Cayde',
    created: new Date(),
    antwoorden: [
      {
        antwoordId: 1,
        content:
          'Want dat uitbreiding staat bekend voor zijn fantastische verhaal, klassen en locaties',
        userName: 'Milo',
        created: new Date(),
      },
      {
        antwoordId: 2,
        content: 'Thancred. Nuff said',
        userName: 'Jane',
        created: new Date(),
      },
      {
        antwoordId: 3,
        userName: 'Mister Smith',
        content: ' Twee woorden, LA HEEEEEEEEEEE',
        created: new Date(),
      },
      {
        antwoordId: 4,
        userName: 'Paolo',
        content: 'Dit heeft niks te maken met eten?',
        created: new Date(),
      },
    ],
  },

  {
    questionId: 2,
    title: 'Destiny 2 of Division 2?',
    content: 'Allebei zijn online looter shooters maar welke is het beste?',
    userName: 'Mario',
    created: new Date(),
    antwoorden: [],
  },
];

//Wacht async in millisecondes
const wacht = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

//return vragen lijst zonder antwoorden
export const getOpenstaandeVragen = async (): Promise<VraagData[]> => {
  await wacht(500);
  return vragen.filter((q) => q.antwoorden.length === 0);
};

//haalt een enkel vraag op
export const getVraag = async (
  questionId: number,
): Promise<VraagData | null> => {
  await wacht(500);
  const resultaten = vragen.filter((v) => v.questionId === questionId);
  return resultaten.length === 0 ? null : resultaten[0];
};

export const zoekVragen = async (criteria: string): Promise<VraagData[]> => {
  await wacht(500);
  return vragen.filter(
    (v) =>
      v.title.toLowerCase().indexOf(criteria.toLowerCase()) >= 0 ||
      v.content.toLowerCase().indexOf(criteria.toLowerCase()) >= 0,
  );
};
