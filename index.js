// config/index.js
// Configuration settings and environment variables go here.
// index.js

const sequelize = require('./db/sequelize-connection');
const Day = require('./models/day');
const Mission = require('./models/mission');
const Goal = require('./models/goal');
const Path = require('./models/path');
const Parameter = require('./models/parameter');
const Journal = require('./models/journal');
const Highlight = require('./models/highlight');
const Drawing = require('./models/drawing');
const JournalRating = require('./models/journalRating');
const Note = require('./models/note');

// Define Associations
// Missions can belong to a Goal or a Path
Mission.belongsTo(Goal, { foreignKey: 'goalId' });
Mission.belongsTo(Path, { foreignKey: 'pathId' });
Goal.hasMany(Mission, { foreignKey: 'goalId' });
Path.hasMany(Mission, { foreignKey: 'pathId' });

// Goals belong to a Path
Goal.belongsTo(Path, { foreignKey: 'pathId' });
Path.hasMany(Goal, { foreignKey: 'pathId' });

// Parameters belong to a Path
Parameter.belongsTo(Path, { foreignKey: 'pathId' });
Path.hasMany(Parameter, { foreignKey: 'pathId' });

// Journal belongs to a Day
Journal.belongsTo(Day, { foreignKey: 'dayId' });
Day.hasOne(Journal, { foreignKey: 'dayId' });

// Highlights and JournalRatings belong to a Journal
Highlight.belongsTo(Journal, { foreignKey: 'journalId' });
Journal.hasMany(Highlight, { foreignKey: 'journalId' });
JournalRating.belongsTo(Journal, { foreignKey: 'journalId' });
Journal.hasMany(JournalRating, { foreignKey: 'journalId' });

// JournalRatings also belong to a Parameter
JournalRating.belongsTo(Parameter, { foreignKey: 'parameterId' });
Parameter.hasMany(JournalRating, { foreignKey: 'parameterId' });

// Highlights and Drawings belong to a Path
Highlight.belongsTo(Path, { foreignKey: 'pathId' });
Path.hasMany(Highlight, { foreignKey: 'pathId' });

// Drawings can belong to a Journal or a Note
Drawing.belongsTo(Journal, { foreignKey: 'journalId' });
Drawing.belongsTo(Note, { foreignKey: 'noteId' });
Journal.hasMany(Drawing, { foreignKey: 'journalId' });
Note.hasMany(Drawing, { foreignKey: 'noteId' });

// Notes can belong to a Goal or a Path
Note.belongsTo(Goal, { foreignKey: 'goalId' });
Note.belongsTo(Path, { foreignKey: 'pathId' });
Goal.hasMany(Note, { foreignKey: 'goalId' });
Path.hasMany(Note, { foreignKey: 'pathId' });

const syncDatabase = async () => {
    try {
        await sequelize.sync();
        console.log('Database synced successfully.');
    } catch (error) {
        console.error('Unable to sync database:', error);
    }
};

module.exports = { syncDatabase };