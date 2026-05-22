# @gistapps/polaris-react-web-components

Drop-in Polaris React-compatible components built on Shopify App Home web components (`<s-*>` elements).

Use this package as a lightweight replacement for `@shopify/polaris` in Shopify App Home embedded apps — the API is intentionally compatible so you can swap imports with minimal changes.

## Installation

```bash
npm install @gistapps/polaris-react-web-components
```

React 18+ is a peer dependency and must be installed separately.

## Usage

```tsx
import {
  AppProvider,
  Page,
  Card,
  Button,
  Text,
} from "@gistapps/polaris-react-web-components";

function App() {
  return (
    <AppProvider>
      <Page title="My page">
        <Card>
          <Text as="p">Hello world</Text>
          <Button variant="primary" onAction={() => alert("clicked!")}>
            Click me
          </Button>
        </Card>
      </Page>
    </AppProvider>
  );
}
```

## Available components

| Component | Notes |
|-----------|-------|
| `AppProvider` | Thin wrapper — no config needed |
| `Frame` | |
| `Page` | |
| `Layout`, `Layout.Section` | |
| `Box` | |
| `Card` | |
| `BlockStack` | |
| `InlineStack` | |
| `InlineGrid` | |
| `Grid` | |
| `Divider` | |
| `Text` | |
| `Button` | |
| `Link` | |
| `ButtonGroup` | |
| `TextField` | |
| `Select` | |
| `Checkbox` | |
| `ChoiceList` | |
| `FormLayout`, `FormLayout.Group` | |
| `DropZone` | |
| `Badge` | |
| `Banner` | |
| `Spinner` | |
| `Modal` | |
| `IndexTable` | |
| `List` | |
| `ResourceList` | |
| `ResourceItem` | |
| `EmptyState` | |
| `HelpCard` | |
| `Thumbnail` | |
| `MediaCard` | |
| `Icon` | |
| `Tooltip` | |
| `ContextualSaveBar` | |
| `CheckCircleIcon` | |

## Contributing

Contributions are welcome! Here's how to get started:

1. Fork the repository and clone it locally.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the build in watch mode while you work:
   ```bash
   npm run dev
   ```
4. Add or update components in the relevant `.tsx` files. Each component wraps a Shopify App Home `<s-*>` web component and exposes a Polaris React-compatible prop interface.
5. Export any new component (and its types) from [polaris-web.tsx](polaris-web.tsx).
6. Open a pull request with a clear description of what changed and why.

### Guidelines

- Keep the Polaris React prop API as close as possible — consumers should be able to swap imports with minimal changes.
- Unsupported props should be accepted but silently ignored (no runtime errors) so existing code doesn't break.
- React 18+ is the minimum supported version; avoid APIs that require newer versions.

## License

MIT
