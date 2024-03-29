// const root = "http://localhost:8080/"
const root = "https://picture-server.fly.dev/";

export const getAllPhotos = async () => {
  try {
    const response = await fetch(root, {
      method: "GET",
      credentials: "include",
    });
    const data = response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const uploadPhoto = async (content) => {
  try {
    const response = await fetch(root + "upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, Z-Key",
        "Access-Control-Allow-Methods": "GET, HEAD, POST, PUT, DELETE, OPTIONS",
      },
      body: JSON.stringify(content),
      credentials: "include",
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const likePhoto = async (id) => {
  try {
    const response = await fetch(root + "like", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: id }),
      credentials: "include",
    });

    if (response.ok) {
      return response.json;
    } else {
      throw new Error("Failed to like photo.");
    }
  } catch (error) {
    console.log(error);
  }
};

export const deletePhoto = async (body) => {
  console.log(body)
  try {
    const response = await fetch(root + "delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, Z-Key",
        "Access-Control-Allow-Methods": "GET, HEAD, POST, PUT, DELETE, OPTIONS",
      },
      body: JSON.stringify(body),
      credentials: "include",
      mode: "cors",
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const login = async (user) => {
  try {
    const response = await fetch(root + "login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
      credentials: "include",
  
    });
    const loggedUser = await response.json();
    return loggedUser;
  } catch (error) {
    console.log(error);
  }
};
export const refreshUser = async (email) => {
  try {
    const response = await fetch(root + "refresh", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({email: email})
    });
    const loggedUser = await response.json();

    return loggedUser;
  } catch (error) {
    console.log(error);
  }
};

export const reg = async (user) => {
  try {
    const response = await fetch(root + "register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
      credentials: "include",
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const out = async () => {
  try {
    const response = await fetch(root + "logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(),
      credentials: "include",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createAlbum = async (albumName) => {
  try {
    const response = await fetch(root + "newAlbum", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, Z-Key",
        "Access-Control-Allow-Methods": "GET, HEAD, POST, PUT, DELETE, OPTIONS",
      },
      body: JSON.stringify(albumName),
      credentials: "include",
      mode: "cors",
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAlbum = async (id) => {
  try {
    const response = await fetch(root + "album", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, Z-Key",
        "Access-Control-Allow-Methods": "GET, HEAD, POST, PUT, DELETE, OPTIONS",
      },
      body: JSON.stringify({ _id: id }),
      credentials: "include",
      mode: "cors",
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteAlbum = async (body) => {
  try {
    const response = await fetch(root + "album", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, Z-Key",
        "Access-Control-Allow-Methods": "GET, HEAD, POST, PUT, DELETE, OPTIONS",
      },
      body: JSON.stringify(body),
      credentials: "include",
      mode: "cors",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const shareAlbumRequest = async (requestObject) => {
  try {
    const response = await fetch(root + "share-album", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, Z-Key",
        "Access-Control-Allow-Methods": "GET, HEAD, POST, PUT, DELETE, OPTIONS",
      },
      body: JSON.stringify(requestObject),
      credentials: "include",
      mode: "cors",
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const acceptInvite = async (albumId) => {
  try {
    const response = await fetch(root + "accept-invite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, Z-Key",
        "Access-Control-Allow-Methods": "GET, HEAD, POST, PUT, DELETE, OPTIONS",
      },
      body: JSON.stringify(albumId),
      credentials: "include",
      mode: "cors",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const removeSharedAlbum = async (body) => {
  console.log('in remove')
  console.log(body)
  try {
    const response = await fetch(root + "album", {
      method: "Put",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, Z-Key",
        "Access-Control-Allow-Methods": "GET, HEAD, POST, PUT, DELETE, OPTIONS",
      },
      body: JSON.stringify(body),
      credentials: "include",
      mode: "cors",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const rejectAlbum = async (albumId) => {
  try {
    const response = await fetch(root + "reject-invite", {
      method: "Put",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, Z-Key",
        "Access-Control-Allow-Methods": "GET, HEAD, POST, PUT, DELETE, OPTIONS",
      },
      body: JSON.stringify(albumId),
      credentials: "include",
      mode: "cors",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (body) => {
  try {
    const response = await fetch(root + "user", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, Z-Key",
        "Access-Control-Allow-Methods": "GET, HEAD, POST, PUT, DELETE, OPTIONS",
      },
      body: JSON.stringify(body),
      credentials: "include",
      mode: "cors",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};