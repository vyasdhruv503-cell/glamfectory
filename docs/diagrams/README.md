# The Glam Factory - System Architecture Diagrams

This folder contains all system architecture diagrams in multiple formats.

## 📁 Contents

| File | Description |
|------|-------------|
| `architecture.mmd` | Main architecture diagram (Mermaid) |
| `customer-journey.mmd` | Customer journey flow |
| `admin-flow.mmd` | Admin panel flow |
| `auth-flow.mmd` | Authentication flow |
| `database-schema.mmd` | Database relationships |
| `payment-flow.mmd` | Payment processing flow |
| `notification-flow.mmd` | Notification system |
| `tech-stack.mmd` | Technology stack |
| `project-structure.mmd` | Project directory structure |
| `all-diagrams.md` | All diagrams in one Markdown file |
| `diagrams.html` | Interactive HTML viewer |

---

## 🔍 How to View/Export Diagrams

### Option 1: Mermaid Live Editor (Online)
1. Go to https://mermaid.live/
2. Copy content from any `.mmd` file
3. Paste in the editor
4. Click **Export** → PNG/SVG/PDF

### Option 2: VS Code Extension
1. Install "Markdown Preview Mermaid Support" extension
2. Open `.mmd` or `.md` files
3. Press `Ctrl+Shift+V` for preview
4. Right-click diagram → Save as PNG/SVG

### Option 3: CLI (Mermaid CLI)
```bash
npm install -g @mermaid-js/mermaid-cli
mmdc -i architecture.mmd -o architecture.png
mmdc -i customer-journey.mmd -o customer-journey.svg
```

### Option 4: HTML Viewer (No Install)
Open `diagrams.html` in any browser - renders all diagrams automatically!

---

## 📊 Diagram Summary

| Diagram | Purpose |
|---------|---------|
| **Architecture** | High-level system overview |
| **Customer Journey** | 6-step booking + account flow |
| **Admin Flow** | 11-page admin panel |
| **Auth Flow** | Register/Login/Middleware |
| **Database Schema** | 25 models + 10 enums |
| **Payment Flow** | Razorpay + Wallet + Offline |
| **Notification Flow** | WhatsApp/Email/SMS/Push |
| **Tech Stack** | Complete technology summary |
| **Project Structure** | Full directory tree |

---

## 🎨 Customization

All diagrams use consistent styling:
- **Primary Color**: Hot Pink (#E91E63)
- **Font**: Cormorant Garamond (headings) + Nunito (body)
- **Theme**: Light with pink accents

To modify colors, edit the `%%{init: {'theme': 'base', 'themeVariables': {...}}}%%` block in each `.mmd` file.