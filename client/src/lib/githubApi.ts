const OWNER = "ejhover";
const REPO = "Chaska-Realty-Blog";
const BRANCH = "main";

function b64EncodeUnicode(str: string) {
  return Buffer.from(unescape(encodeURIComponent(str))).toString("base64");
}

export async function getFileContents(path: string, token: string) {
  const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}?ref=${BRANCH}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `token ${token}`,
      Accept: "application/vnd.github+json",
    },
  });
  if (!res.ok) throw new Error(`Failed to fetch ${path}: ${res.status}`);
  return res.json();
}

export async function putFileContents(path: string, content: string, message: string, token: string, sha?: string) {
  const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`;
  const body = {
    message,
    content: b64EncodeUnicode(content),
    branch: BRANCH,
  } as any;
  if (sha) body.sha = sha;

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `token ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Failed to update ${path}: ${res.status} ${text}`);
  }

  return res.json();
}

export async function fetchJSONFile(path: string, token: string) {
  const data = await getFileContents(path, token);
  if (data && data.content) {
    const decoded = Buffer.from(data.content, "base64").toString("utf8");
    return { json: JSON.parse(decoded), sha: data.sha };
  }
  throw new Error("Unexpected file format");
}

export async function saveJSONFile(path: string, obj: any, message: string, token: string, sha?: string) {
  const content = JSON.stringify(obj, null, 2);
  return putFileContents(path, content, message, token, sha);
}

export async function validateGitHubToken(token: string) {
  const res = await fetch("https://api.github.com/user", { headers: { Authorization: `token ${token}` } });
  return res.ok;
}