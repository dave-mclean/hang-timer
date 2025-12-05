# Google Sheets Setup Instructions

To enable workout logging to Google Sheets, follow these steps:

## 1. Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Hang Timer Workouts" (or any name you prefer)
4. In the first row, add these column headers:
   - Timestamp
   - Date
   - Time
   - Blocks
   - Sets
   - Reps
   - Work Per Rep (sec)
   - Rest Per Rep (sec)
   - Rest Per Set (sec)
   - Rest Per Block (sec)
   - Prepare Seconds

## 2. Create a Google Apps Script

1. In your Google Sheet, go to **Extensions** → **Apps Script**
2. Delete any default code and paste this script:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Parse the JSON data from the request
    const data = JSON.parse(e.postData.contents);

    // Append the data as a new row
    sheet.appendRow([
      data.timestamp,
      data.date,
      data.time,
      data.blocks,
      data.sets,
      data.reps,
      data.work_per_rep,
      data.rest_per_rep,
      data.rest_per_set,
      data.rest_per_block,
      data.prepare_seconds
    ]);

    return ContentService.createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Click **Save** (or press Ctrl+S / Cmd+S)
4. Give your project a name (e.g., "Hang Timer Logger")

## 3. Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type" and choose **Web app**
3. Set the following:
   - **Description**: "Hang Timer Workout Logger"
   - **Execute as**: "Me"
   - **Who has access**: "Anyone" (this allows your HTML page to call it)
4. Click **Deploy**
5. **Copy the Web App URL** that appears (it will look like: `https://script.google.com/macros/s/.../exec`)

## 4. Update the HTML File

1. Open `hang.html`
2. Find the line: `const GOOGLE_SHEETS_WEB_APP_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';`
3. Replace `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` with the Web App URL you copied
4. Save the file

## 5. Test It

1. Open `hang.html` in your browser
2. Complete a workout (or use the Stop button to end early)
3. Click the "Log Workout" button that appears
4. Check your Google Sheet - you should see a new row with your workout data!

## Troubleshooting

- **"Error - Try Again"**: Make sure the Web App URL is correct and the deployment is set to "Anyone"
- **No data appears**: Check the Apps Script execution log (View → Logs) for errors
- **CORS errors**: The code uses `no-cors` mode, so you won't see response data, but the data should still be logged

## Security Note

The Web App is set to "Anyone" access, which means anyone with the URL can add data to your sheet. This is fine for personal use, but if you're concerned about security, you can:
- Use Google OAuth for authentication (more complex)
- Add a simple password check in the Apps Script
- Restrict access and use a proxy server
