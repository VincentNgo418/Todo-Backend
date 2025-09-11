import unittest
import json
import datetime
import time
import requests

BASE_URL = 'http://localhost:3000/api'

class TestApiEndpoints(unittest.TestCase):

    def setUp(self):
        """Setup any resources needed for the tests.
        We'll use a single setup method to clean up the database
        before each test to ensure a fresh state.
        """
        # Note: In a real-world scenario, you'd use a more robust
        # database cleaning method, like a test database or a
        # dedicated cleanup endpoint. For this example, we'll
        # assume a fresh start.
        self.goal_id = 1
        self.path_id = 1
        self.mission_id_with_goal = 1
        self.mission_id_with_path = 2
        self.day_id = 1
        self.journal_id = 1
        self.highlight_id = 1
        self.note_id = 1
        self.param_id = 1

    def print_test_header(self, test_name):
        print(f"\n--- {test_name} ---")

    # The test order is crucial for an empty database
    # Test names starting with a letter will be run alphabetically

    def test_a_create_initial_data(self):
        """
        Tests the creation of foundational data (Path, Goal, Parameter)
        needed for subsequent tests.
        """
        self.print_test_header("TEST: Create Initial Data (Path, Goal, Parameter)")
        
        # Test Path creation
        path_response = requests.post(f"{BASE_URL}/paths", json={"name": "Growth", "color": "255,100,0"})
        self.assertEqual(path_response.status_code, 201)
        self.path_id = path_response.json()['id']
        
        # Test Goal creation
        goal_response = requests.post(f"{BASE_URL}/goals", json={"name": "Learn Python", "details": "Become proficient in Python.", "pathId": self.path_id})
        self.assertEqual(goal_response.status_code, 201)
        self.goal_id = goal_response.json()['id']
        
        # Test Parameter creation
        param_response = requests.post(f"{BASE_URL}/parameters", json={"name": "Energy", "scale": 10, "pathId": self.path_id})
        self.assertEqual(param_response.status_code, 201)
        self.param_id = param_response.json()['id']
        
        print("✅ Test Passed: Initial data created successfully.")

    def test_b_render_day(self):
        """
        Tests the 'renderDay' function.
        Endpoint: GET /api/days
        """
        self.print_test_header("TEST: Render Day")
        date_to_test = datetime.date.today().isoformat()
        response = requests.get(f"{BASE_URL}/days?date={date_to_test}")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn('day', data)
        self.day_id = data['day']['id']
        print("✅ Test Passed: Day rendered and created successfully.")

    def test_c_create_and_get_missions(self):
        """
        Tests 'massCreateMission' and 'getAll' for Missions.
        Endpoints: POST /api/missions/mass-create, GET /api/missions
        """
        self.print_test_header("TEST: Create & Get Missions")
        # All date fields are now strings in 'YYYY-MM-DD' format
        missions_data = {
            "missions": [
                {"details": "Review project scope", "dueDate": "2025-08-20", "goalId": self.goal_id, "pathId": None},
                {"details": "Meditate for 5 min", "dueDate": None, "goalId": None, "pathId": self.path_id}
            ]
        }
        
        create_response = requests.post(f"{BASE_URL}/missions/mass-create", json=missions_data)
        self.assertEqual(create_response.status_code, 201)
        
        get_response = requests.get(f"{BASE_URL}/missions")
        self.assertEqual(get_response.status_code, 200)
        self.assertGreaterEqual(len(get_response.json()), 2)
        
        self.mission_id_with_goal = create_response.json()[0]['id']
        self.mission_id_with_path = create_response.json()[1]['id']
        
        print("✅ Test Passed: Missions created and retrieved successfully.")

    def test_d_get_missions_by_due_date_and_without(self):
        """
        Tests 'getMissionsbyDueDate' and 'getMissionsWithoutDueDate'.
        Endpoints: GET /api/missions/by-due-date, GET /api/missions/without-due-date
        """
        self.print_test_header("TEST: Get Missions by Due Date & Without")
        date_to_query = "2025-08-20"
        
        due_date_response = requests.get(f"{BASE_URL}/missions/by-due-date/{date_to_query}")
        self.assertEqual(due_date_response.status_code, 200)
        self.assertGreater(len(due_date_response.json()), 0)
        
        no_due_date_response = requests.get(f"{BASE_URL}/missions/without-due-date")
        self.assertEqual(no_due_date_response.status_code, 200)
        self.assertGreater(len(no_due_date_response.json()), 0)
        
        print("✅ Test Passed: Missions retrieved by due date and without successfully.")

    def test_e_get_missions_by_goal_and_path(self):
        """
        Tests 'getMissionsbyGoal' and 'getMissionsbyPath'.
        Endpoints: GET /api/missions/by-goal/:goalId, GET /api/missions/by-path/:pathId
        """
        self.print_test_header("TEST: Get Missions by Goal & Path")
        
        goal_response = requests.get(f"{BASE_URL}/missions/by-goal/{self.goal_id}")
        self.assertEqual(goal_response.status_code, 200)
        self.assertGreater(len(goal_response.json()), 0)
        
        path_response = requests.get(f"{BASE_URL}/missions/by-path/{self.path_id}")
        self.assertEqual(path_response.status_code, 200)
        self.assertGreater(len(path_response.json()), 0)
        
        print("✅ Test Passed: Missions retrieved by goal and path successfully.")
        
    def test_f_update_and_get_mission_by_id(self):
        """
        Tests 'updateMission' and 'getbyID' for Missions.
        Endpoints: PUT /api/missions/:id, GET /api/missions/:id
        """
        self.print_test_header("TEST: Update & Get Mission by ID")
        update_data = {"details": "Updated project scope review"}
        response = requests.put(f"{BASE_URL}/missions/{self.mission_id_with_goal}", json=update_data)
        self.assertEqual(response.status_code, 200)
        
        get_response = requests.get(f"{BASE_URL}/missions/{self.mission_id_with_goal}")
        self.assertEqual(get_response.status_code, 200)
        self.assertEqual(get_response.json()['details'], "Updated project scope review")
        
        print("✅ Test Passed: Mission updated and retrieved by ID successfully.")

    def test_g_mark_mission_complete_and_incomplete(self):
        """
        Tests 'markComplete' and 'markIncomplete' for Missions.
        Endpoints: PUT /api/missions/:id/complete, PUT /api/missions/:id/incomplete
        """
        self.print_test_header("TEST: Mark Mission Complete & Incomplete")
        
        complete_response = requests.put(f"{BASE_URL}/missions/{self.mission_id_with_goal}/complete")
        self.assertEqual(complete_response.status_code, 200)
        
        incomplete_response = requests.put(f"{BASE_URL}/missions/{self.mission_id_with_goal}/incomplete")
        self.assertEqual(incomplete_response.status_code, 200)
        
        print("✅ Test Passed: Mission status updated successfully.")

    def test_h_get_goals_by_path_and_all(self):
        """
        Tests 'GetGoalbyPath' and 'GetAll' for Goals.
        Endpoints: GET /api/goals/by-path/:pathId, GET /api/goals
        """
        self.print_test_header("TEST: Get Goals by Path & All")
        
        by_path_response = requests.get(f"{BASE_URL}/goals/by-path/{self.path_id}")
        self.assertEqual(by_path_response.status_code, 200)
        self.assertGreater(len(by_path_response.json()), 0)
        
        all_goals_response = requests.get(f"{BASE_URL}/goals")
        self.assertEqual(all_goals_response.status_code, 200)
        self.assertGreater(len(all_goals_response.json()), 0)
        
        print("✅ Test Passed: Goals retrieved by path and all successfully.")

    def test_i_update_and_get_goal_by_id(self):
        """
        Tests 'updateGoal' and 'getbyID' for Goals.
        Endpoints: PUT /api/goals/:id, GET /api/goals/:id
        """
        self.print_test_header("TEST: Update & Get Goal by ID")
        update_data = {"name": "Learn Python & JS"}
        response = requests.put(f"{BASE_URL}/goals/{self.goal_id}", json=update_data)
        self.assertEqual(response.status_code, 200)
        
        get_response = requests.get(f"{BASE_URL}/goals/{self.goal_id}")
        self.assertEqual(get_response.status_code, 200)
        self.assertEqual(get_response.json()['name'], "Learn Python & JS")
        
        print("✅ Test Passed: Goal updated and retrieved by ID successfully.")
        
    def test_j_get_all_and_by_id_path(self):
        """
        Tests 'GetAll' and 'GetbyID' for Paths.
        Endpoints: GET /api/paths, GET /api/paths/:id
        """
        self.print_test_header("TEST: Get All & By ID Paths")
        
        all_response = requests.get(f"{BASE_URL}/paths")
        self.assertEqual(all_response.status_code, 200)
        self.assertGreater(len(all_response.json()), 0)
        
        by_id_response = requests.get(f"{BASE_URL}/paths/{self.path_id}")
        self.assertEqual(by_id_response.status_code, 200)
        self.assertEqual(by_id_response.json()['name'], 'Growth')
        
        print("✅ Test Passed: Paths retrieved successfully.")
        
    def test_k_get_all_parameters(self):
        """
        Tests 'GetAll' for Parameters.
        Endpoint: GET /api/parameters
        """
        self.print_test_header("TEST: Get All Parameters")
        response = requests.get(f"{BASE_URL}/parameters")
        self.assertEqual(response.status_code, 200)
        self.assertGreater(len(response.json()), 0)
        print("✅ Test Passed: All parameters retrieved successfully.")
        
    def test_l_create_get_and_update_journal(self):
        """
        Tests 'createNew', 'GetbyDay', and 'update' for Journals.
        Endpoints: POST /api/journals, GET /api/journals/by-day/:dayId, PUT /api/journals/:id
        """
        self.print_test_header("TEST: Create, Get & Update Journal")
        # Journal was created during renderDay, we'll retrieve it.
        journal_response = requests.get(f"{BASE_URL}/journals/by-day/{self.day_id}")
        self.assertEqual(journal_response.status_code, 200)
        self.journal_id = journal_response.json()['id']
        
        update_response = requests.put(f"{BASE_URL}/journals/{self.journal_id}", json={"text": "My updated journal entry."})
        self.assertEqual(update_response.status_code, 200)
        
        print("✅ Test Passed: Journal created, retrieved and updated successfully.")
        
    def test_m_create_get_delete_highlight(self):
        """
        Tests 'createNew', 'getByJournal', and 'delete' for Highlights.
        Endpoints: POST /api/highlights, GET /api/highlights/by-journal/:journalId, DELETE /api/highlights/:id
        """
        self.print_test_header("TEST: Create, Get & Delete Highlight")
        highlight_data = {"startIndex": 5, "endIndex": 15, "journalId": self.journal_id, "pathId": self.path_id}
        create_response = requests.post(f"{BASE_URL}/highlights", json=highlight_data)
        self.assertEqual(create_response.status_code, 201)
        self.highlight_id = create_response.json()['id']
        
        get_response = requests.get(f"{BASE_URL}/highlights/by-journal/{self.journal_id}")
        self.assertEqual(get_response.status_code, 200)
        self.assertGreater(len(get_response.json()), 0)
        
        delete_response = requests.delete(f"{BASE_URL}/highlights/{self.highlight_id}")
        self.assertEqual(delete_response.status_code, 204)
        
        print("✅ Test Passed: Highlight created, retrieved, and deleted successfully.")
        
    def test_n_create_and_get_notes(self):
        """
        Tests 'create' for Notes.
        Endpoint: POST /api/notes
        """
        self.print_test_header("TEST: Create & Get Notes")
        note_data = {"text": "A note about my goals.", "goalId": self.goal_id, "pathId": None}
        create_response = requests.post(f"{BASE_URL}/notes", json=note_data)
        self.assertEqual(create_response.status_code, 201)
        self.note_id = create_response.json()['id']
        print("✅ Test Passed: Note created successfully.")

    def test_o_create_get_update_delete_drawing(self):
        """
        Tests 'createNew', 'getByJournal', 'getByNotes', 'update', and 'delete' for Drawings.
        Endpoints: POST /api/drawings, GET /api/drawings/by-journal/:journalId, etc.
        """
        self.print_test_header("TEST: Create, Get, Update & Delete Drawing")
        # Test Drawing creation linked to a Journal
        drawing_data_journal = {"location": 100, "journalId": self.journal_id, "noteId": None}
        create_response_journal = requests.post(f"{BASE_URL}/drawings", json=drawing_data_journal)
        self.assertEqual(create_response_journal.status_code, 201)
        self.journal_drawing_id = create_response_journal.json()['id']
        
        # Test Drawing creation linked to a Note
        drawing_data_note = {"location": 50, "journalId": None, "noteId": self.note_id}
        create_response_note = requests.post(f"{BASE_URL}/drawings", json=drawing_data_note)
        self.assertEqual(create_response_note.status_code, 201)
        self.note_drawing_id = create_response_note.json()['id']
        
        # Test retrieval by Journal
        get_by_journal_response = requests.get(f"{BASE_URL}/drawings/by-journal/{self.journal_id}")
        self.assertEqual(get_by_journal_response.status_code, 200)
        self.assertGreater(len(get_by_journal_response.json()), 0)
        
        # Test retrieval by Notes
        get_by_notes_response = requests.get(f"{BASE_URL}/drawings/by-notes/{self.note_id}")
        self.assertEqual(get_by_notes_response.status_code, 200)
        self.assertGreater(len(get_by_notes_response.json()), 0)
        
        # Test update
        update_data = {"location": 120}
        update_response = requests.put(f"{BASE_URL}/drawings/{self.journal_drawing_id}", json=update_data)
        self.assertEqual(update_response.status_code, 200)
        
        # Test delete
        delete_response = requests.delete(f"{BASE_URL}/drawings/{self.journal_drawing_id}")
        self.assertEqual(delete_response.status_code, 204)
        
        print("✅ Test Passed: Drawings created, retrieved, updated, and deleted successfully.")

    def test_p_create_get_update_journal_ratings(self):
        """
        Tests 'create', 'getByJournal', and 'update' for Journal Ratings.
        Endpoints: POST /api/journalRatings, GET /api/journalRatings/by-journal/:journalId, PUT /api/journalRatings/:id
        """
        self.print_test_header("TEST: Create, Get & Update Journal Ratings")
        rating_data = {"rating": 8, "parameterId": self.param_id, "journalId": self.journal_id}
        create_response = requests.post(f"{BASE_URL}/journalRatings", json=rating_data)
        self.assertEqual(create_response.status_code, 201)
        self.rating_id = create_response.json()['id']
        
        get_response = requests.get(f"{BASE_URL}/journalRatings/by-journal/{self.journal_id}")
        self.assertEqual(get_response.status_code, 200)
        self.assertGreater(len(get_response.json()), 0)
        
        update_data = {"rating": 9}
        update_response = requests.put(f"{BASE_URL}/journalRatings/{self.rating_id}", json=update_data)
        self.assertEqual(update_response.status_code, 200)
        
        print("✅ Test Passed: Journal Ratings created, retrieved, and updated successfully.")

    def test_q_update_and_delete_notes(self):
        """
        Tests 'update' and 'delete' for Notes.
        Endpoints: PUT /api/notes/:id, DELETE /api/notes/:id
        """
        self.print_test_header("TEST: Update & Delete Notes")
        update_data = {"text": "Updated note details."}
        update_response = requests.put(f"{BASE_URL}/notes/{self.note_id}", json=update_data)
        self.assertEqual(update_response.status_code, 200)
        
        delete_response = requests.delete(f"{BASE_URL}/notes/{self.note_id}")
        self.assertEqual(delete_response.status_code, 204)
        
        print("✅ Test Passed: Notes updated and deleted successfully.")

if __name__ == '__main__':
    unittest.main(argv=['first-arg-is-ignored'], exit=False)