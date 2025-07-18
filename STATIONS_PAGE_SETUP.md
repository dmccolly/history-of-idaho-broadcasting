# Stations Page Setup Guide

This guide provides instructions for setting up the Stations Page in Storyblok to manage radio station content.

## Overview

The Stations Page allows you to:
- Display a collection of radio stations with their details
- Categorize stations by format
- Provide detailed information about each station
- Customize the page title and description

## Storyblok Setup

### Step 1: Create Content Types in Storyblok

1. **Create Station Item Component**:
   - Go to your Storyblok space
   - Navigate to "Block Library" in the sidebar
   - Click "Create new" > "Content type block"
   - Name: `station_item`
   - Add these fields:

   | Field Name | Type | Required | Description |
   |------------|------|----------|-------------|
   | id | Text | Yes | Unique identifier for the station (e.g., kboi, krvb) |
   | name | Text | Yes | Call letters of the station (e.g., KBOI, KRVB) |
   | frequency | Text | Yes | Broadcast frequency (e.g., 670 AM, 94.9 FM) |
   | format | Text | Yes | Station format (e.g., News/Talk, Adult Album Alternative) |
   | logo | Asset | Yes | Logo image for the station |
   | description | Textarea | Yes | Brief description of the station (displayed on cards) |
   | fullContent | Rich Text | Yes | Detailed information about the station (displayed in modal) |
   | color | Text | No | Brand color for the station (hex code) |

2. **Create Stations Page Component**:
   - Click "Create new" > "Content type block"
   - Name: `stations_page`
   - Add these fields:

   | Field Name | Type | Required | Description |
   |------------|------|----------|-------------|
   | title | Text | No | Main title for the stations page |
   | description | Textarea | No | Introductory text for the stations page |
   | stations | Blocks | No | Radio stations to display (restrict to station_item) |

### Step 2: Create Stations Page Content

1. **Create a New Story**:
   - Go to "Content" in Storyblok
   - Click "Create new" > "Story"
   - Name: `Stations`
   - Slug: `stations`
   - Content Type: `page`

2. **Add Stations Page Component**:
   - In the content editor, add a `stations_page` component
   - Set the title and description as desired
   - Add station items by clicking the "+" button in the stations field

3. **Add Station Items**:
   - For each station, add a `station_item` component
   - Fill in all the required fields:
     - ID: A unique identifier (e.g., kboi)
     - Name: Station call letters (e.g., KBOI)
     - Frequency: Broadcast frequency (e.g., 670 AM)
     - Format: Station format (e.g., News/Talk)
     - Logo: Upload a station logo image
     - Description: Brief description of the station
     - Full Content: Detailed information about the station (can include HTML)
     - Color: Brand color as hex code (e.g., #0070f3)

4. **Publish the Story**:
   - Click "Publish" to make the stations page live

## Example Station Item

Here's an example of how to fill out a station item:

- **ID**: kboi
- **Name**: KBOI
- **Frequency**: 670 AM
- **Format**: News/Talk
- **Logo**: [Upload KBOI logo]
- **Description**: KBOI 670 AM is one of Idaho's oldest and most respected radio stations, providing news, talk, and information programming to the Treasure Valley since 1927.
- **Full Content**:
  ```html
  <h3>History of KBOI 670 AM</h3>
  <p>KBOI 670 AM is one of Idaho's oldest and most influential radio stations, with a history dating back to 1927. For nearly a century, KBOI has been a trusted voice for news and information in the Treasure Valley.</p>
  
  <h3>Pioneer in Idaho Broadcasting</h3>
  <p>As one of the first radio stations in Idaho, KBOI played a pivotal role in the development of broadcasting in the state. The station's powerful signal has allowed it to reach listeners throughout southern Idaho and beyond.</p>
  
  <h3>News and Talk Format</h3>
  <p>Today, KBOI features a news/talk format with a mix of local and nationally syndicated programming. The station's news department provides comprehensive coverage of local, regional, and national events.</p>
  
  <h3>Community Institution</h3>
  <p>Throughout its long history, KBOI has remained a vital community institution, serving as a source of information during emergencies, a forum for public discourse, and a champion for local causes.</p>
  ```
- **Color**: #2C3E50

## Features

The Stations Page includes these features:

1. **Format Filtering**:
   - Stations are automatically categorized by format
   - Users can filter stations by clicking on format buttons

2. **Station Cards**:
   - Each station is displayed as a card with logo, name, frequency, and brief description
   - Cards use the station's brand color for visual identity

3. **Detail Modal**:
   - Clicking "Read More" opens a modal with detailed information about the station
   - The modal displays the full content in a formatted layout

4. **Responsive Design**:
   - The page is fully responsive and works on all device sizes
   - Grid layout adjusts based on screen width

## Customization Options

You can customize the Stations Page by:

1. **Changing the Title and Description**:
   - Edit the title and description fields in the stations_page component

2. **Adding or Removing Stations**:
   - Add new station_item components to add more stations
   - Remove station_item components to remove stations

3. **Updating Station Information**:
   - Edit any station_item to update its information
   - Changes will be reflected immediately after publishing

## Troubleshooting

If you encounter issues:

1. **Stations not appearing**:
   - Ensure all required fields are filled out for each station
   - Check that the stations_page component is properly added to the page

2. **Images not loading**:
   - Verify that logo images are properly uploaded to Storyblok
   - Check that image URLs are correct

3. **Formatting issues in full content**:
   - Use the rich text editor's formatting tools for proper HTML structure
   - Preview the content to ensure it displays correctly

## Next Steps

After setting up the Stations Page:

1. **Preview the Page**:
   - Use Storyblok's preview feature to see how the page looks
   - Test the filtering and modal functionality

2. **Publish Changes**:
   - Click "Publish" to make your changes live
   - The website will automatically update with the new content

3. **Regular Updates**:
   - Keep station information up-to-date by editing the content in Storyblok
   - Add new stations as needed